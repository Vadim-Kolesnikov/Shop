from django.core.management.base import BaseCommand
from main.utils import generate_random_products
from main.models import Type, Brand


class Command(BaseCommand):
    help = u'Создание продуктов по умолчанию'

    def add_arguments(self, parser):
        parser.add_argument('num', type=int, help=u'Количество пачек создаваемых продуктов')

    def handle(self, *args, **kwargs):
        num = kwargs['num']
        brands = Brand.objects.all()
        types = Type.objects.all()
        generate_random_products(num, brands, types)
        self.stdout.write("создание продуктов прошло успешно")

        