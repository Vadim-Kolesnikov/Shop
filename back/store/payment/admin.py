from django.contrib import admin
from .models import *

admin.site.register(OrderStatus)
admin.site.register(OrderProduct)
admin.site.register(DeliveryType)
admin.site.register(OrderPayment)