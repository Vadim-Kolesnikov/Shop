from rest_framework import serializers
from .models import *
from main.serializers import ProductSerializer
from django.contrib.auth import get_user_model



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'


class OrderPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderPayment
        fields = '__all__'      


class OrderProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderProduct
        fields = '__all__'
        
class OrderStatusSerilizer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = '__all__'


class DeliveryTypeSerilizer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryType
        fields = '__all__'

class OrderSerilizer(serializers.ModelSerializer):
    user = UserSerializer()
    products = OrderProductSerializer(many=True)
    delivery_type = DeliveryTypeSerilizer()
    status = OrderStatusSerilizer()

    class Meta:
        model = Order
        fields = '__all__'