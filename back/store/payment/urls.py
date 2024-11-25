from django.urls import path
from .views import *

urlpatterns = [
    path('create_payment', CreatePaymentAPIView.as_view()),
    path('check_payment', CheckPaymentAPIView.as_view()),
    path('orders', OrderListAPIView.as_view()),
    path('orders/<int:pk>/', OrderRetrieveAPIView.as_view()),
    path('delivery_types', DeliveryTypeListAPIView.as_view()),
]