from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import *
from payment.models import *
from .serializers import *
from .utils import *
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_402_PAYMENT_REQUIRED, HTTP_400_BAD_REQUEST



class CartAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        cart = Cart.objects.get(user=user)
        serializer = CartSerilizer(cart)
        return Response(serializer.data)
    
    def patch(self, request):
        user = request.user
        cart = Cart.objects.get(user=user)
        
        if cart.in_order:
            message = {'message': 'Невозможно обновить корзину, пока заказ с товарами в ней ожидает оплаты'}
            return Response(message, status=HTTP_402_PAYMENT_REQUIRED)

        id = int(request.data['product_id'])
        qty = int(request.data['product_qty'])
        
        product = Product.objects.filter(id=id)
        
        if product.exists():
            product = product[0]
        else:
            message = {'message': 'Товара с таким id не существует'}
            return Response(message, status=HTTP_404_NOT_FOUND)
        
        cart_product = cart.products.filter(product=product)
        
        
        if qty > product.qty:
            message = {'message': 'Недостаточно товара в наличии'}
            return Response(message, status=HTTP_400_BAD_REQUEST)
        elif qty <= 0:
            message = {'message': 'Количество товара для добавления должно быть больше 0'}
            return Response(message, status=HTTP_400_BAD_REQUEST)
        
        if cart_product.exists():
            cart_product = cart_product[0]
            
            if qty + cart_product.qty > product.qty:
                message = {'message': 'Недостаточно товара в наличии'}
                return Response('Недостаточно товара в наличии', status=HTTP_400_BAD_REQUEST)
            
            cart_product.qty += qty
            cart_product.save()
        else:   
            cart_product = CartProduct(product=product, qty=qty)
            cart_product.save()
            cart.products.add(cart_product)
                
        message = {'message': 'Товар успешно добавлен в корзину'}
        return Response(message, status=HTTP_200_OK)
    
    def delete(self, request):
        cart = Cart.objects.get(user=request.user)
        if cart.in_order:
            message = {'message': 'Невозможно обновить корзину, пока заказ с товарами в ней ожидает оплаты'}
            return Response(message, status=HTTP_402_PAYMENT_REQUIRED)
        
        id = int(request.data['cart_product_id'])
        qty = int(request.data['qty'])

        cart_product = cart.products.filter(id=id)
    
        if cart_product.exists():
            cart_product = cart_product[0]
        else:
            message = {'message': "В корзине пользователя не существует продукта с таким id"}
            return Response(message, status=HTTP_404_NOT_FOUND)
        
        if qty >= cart_product.qty:
            cart_product.delete()
        else:
            cart_product.qty -= qty
            cart_product.save()
        message = {'message': "Товар успешно удален из корзины пользователя"}
        return Response(message, status=HTTP_200_OK)


class WishListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        wish_list = WishList.objects.get(user=user)
        serializer = WishListSerilizer(wish_list)
        return Response(serializer.data)
    
    def patch(self, request):
        id = int(request.data['product_id'])
        product = Product.objects.filter(id=id)
        
        if not product.exists():
            message = {'message': 'Товара с таким id не существует'}
            return Response(message, status=HTTP_404_NOT_FOUND)
        product = product[0]
        
        user = request.user
        cart = WishList.objects.get(user=user)
        cart.products.add(product)
        
        message = {'message': "Товар успешно добавлен в список желаемого"}
        return Response(message, status=HTTP_200_OK)
    
    def delete(self, request):
        id = int(request.data['product_id'])
        wish_list = WishList.objects.get(user=request.user)
        product = wish_list.products.filter(id=id)

        if not product.exists():
            message = {'message': 'Товара с таким id не существует в списке желаемого пользователя'}
            return Response(message, status=HTTP_404_NOT_FOUND)
        
        product = product[0]

        wish_list.products.remove(product)

        message = {'message': "Товар успешно удален из списка желаемого пользователя"}
        return Response(message, status=HTTP_200_OK)
    

class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerilizer(profile)
        return Response(serializer.data)

    


