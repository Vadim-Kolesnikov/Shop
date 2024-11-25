from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
import json
from yookassa import Configuration
from .serializers import *
from .models import *
from accounts.models import Cart
from django.conf import settings
from .utils import *
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_201_CREATED, HTTP_204_NO_CONTENT

Configuration.account_id = settings.YOOKASSA_ACCOUNT_ID
Configuration.secret_key = settings.YOOKASSA_SECRET_KEY


class CreatePaymentAPIView(APIView):
    def post(self, request):

        user = request.user
        cart = Cart.objects.get(user=user)
        address = request.data['address']
        delivery_type_id = int(request.data['delivery_type_id'])
        redirect_url = request.data['redirect_url']

        delivery_type = DeliveryType.objects.filter(id=delivery_type_id)
        if delivery_type.exists():
            delivery_type = delivery_type[0]
        else:
            message = "Тип доставки с таким id не найдет"
            return Response(message, status=HTTP_404_NOT_FOUND)
        
        status = OrderStatus.objects.filter(name='init')
        if status.exists():
            status = status[0]
        else:
            message = "Init статус не внесен в базу данных"
            return Response(message, status=HTTP_500_INTERNAL_SERVER_ERROR)
        

        value = cart.total + delivery_type.price
        currency = "RUB"
        des = "Заказ №1"

        
        order = create_order(user, address, delivery_type, status)
        payment = create_payment(value, currency, redirect_url, des)

        order_payment = OrderPayment.objects.create(order=order, payment_id=payment.id, status=payment.status)
        order_payment.save()

        cart.in_order = True
        cart.save()

        message = 'Заказ и оплата успппешно созданы'
        return Response(message, status=HTTP_201_CREATED)
    

class CheckPaymentAPIView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        data = json.loads(request.body.decode())

        payment_id = data['object']['id']
        status = data['object']['status']

        order_payment = OrderPayment.objects.get(payment_id=payment_id)
        order_payment.status = status
        order_payment.save()
        
        return Response(status=HTTP_204_NO_CONTENT)
    
class OrderListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerilizer

class OrderRetrieveAPIView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerilizer

class DeliveryTypeListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = DeliveryType.objects.all()
    serializer_class = DeliveryTypeSerilizer
    
    @method_decorator(cache_page(60))
    def list(self, request, *args, **kwargs):    
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    



