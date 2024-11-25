from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Удаление всех моделей'

    def handle(self, *args, **kwargs):
       
        self.stdout.write('Удаление прошло успешно (пока не реализованно)')