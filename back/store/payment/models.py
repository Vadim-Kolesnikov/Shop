from django.db import models
from main.models import Product
from django.contrib.auth import get_user_model

User = get_user_model()

class OrderStatus(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    des = models.TextField(verbose_name='Описание', default='des')

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Статус заказа'
        verbose_name_plural = 'Статусы заказа'

class DeliveryType(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    price = models.DecimalField(max_digits=10, decimal_places=2, 
                                default=100, verbose_name='Цена')
    time = models.IntegerField(default=0, verbose_name='Время доставки (в днях)')

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Типы доставки'
        verbose_name_plural = 'Типы доставки'
    
class OrderProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Товар')
    qty = models.IntegerField(verbose_name='Количество')
    
    def __str__(self):
        return f'Продукт заказа {self.product.name}'
    
    class Meta:
        verbose_name = 'Продукт заказа'
        verbose_name_plural = 'Продукты заказа'


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    address = models.TextField(verbose_name='Адрес доставки')
    products = models.ManyToManyField(OrderProduct, verbose_name='Товары')
    delivery_type = models.ForeignKey(DeliveryType, on_delete=models.PROTECT, verbose_name='Тип доставки')
    status = models.ForeignKey(OrderStatus, on_delete=models.PROTECT, verbose_name='Статус')
    total = models.DecimalField(max_digits=10, decimal_places=2, 
                                default=0, verbose_name='Цена')
    is_paid = models.BooleanField(default=False, verbose_name="Оплата")

    def __str__(self):
        return f'Заказ {self.id} пользователя {self.user.username}'
    
    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'


class OrderPayment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, blank=True, null=True)
    payment_id = models.CharField(max_length=200)
    status = models.CharField(max_length=100)
    
    class Meta:
        verbose_name = 'Оплата'
        verbose_name_plural = 'Оплаты'



    
    