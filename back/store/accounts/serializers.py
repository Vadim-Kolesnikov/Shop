from rest_framework import serializers
from .models import *
from main.serializers import ProductSerializer
from payment.serializers import OrderSerilizer
from django.contrib.auth import get_user_model



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'


class CartProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = CartProduct
        fields = '__all__'


class CartSerilizer(serializers.ModelSerializer):
    user = UserSerializer()
    products = CartProductSerializer(many=True)

    class Meta:
        model = Cart
        fields = '__all__'


class WishListSerilizer(serializers.ModelSerializer):
    user = UserSerializer()
    products = ProductSerializer(many=True)

    class Meta:
        model = WishList
        fields = '__all__'


class ProfileSerilizer(serializers.ModelSerializer):
    user = UserSerializer()
    cart = CartSerilizer()
    wish_list = WishListSerilizer()
    orders = OrderSerilizer(many=True)

    class Meta:
        model = Profile
        fields = '__all__'