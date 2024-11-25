from django.core.management.base import BaseCommand
from main.models import Type, Brand
from payment.models import OrderStatus, DeliveryType
from main.utils import generate_simple_models
from django.conf import settings

class Command(BaseCommand):
    help = 'Создание простых моделей по умолчанию'

    def handle(self, *args, **kwargs):
        generate_simple_models(Brand, settings.DEFAULT_BRANDS)
        generate_simple_models(Type, settings.DEFAULT_TYPES)
        generate_simple_models(OrderStatus, settings.DEFAULT_ORDER_STATUS)
        generate_simple_models(DeliveryType, settings.DEFAULT_DELIVERY_TYPES)
        self.stdout.write('Создание простых моделей прошло успешно')