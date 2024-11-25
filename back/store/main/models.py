from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save, m2m_changed, pre_delete
from django.utils.text import slugify

class Type(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Тип продукта'
        verbose_name_plural = 'Типы продуктов'
        

class Brand(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Производитель'
        verbose_name_plural = 'Производители'
    

class Product(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    des = models.TextField(verbose_name='Описание')
    type = models.ForeignKey(Type, on_delete=models.PROTECT, 
                             verbose_name='Тип', blank=True, null=True)
    brand = models.ForeignKey(Brand, verbose_name="Бренды", on_delete=models.PROTECT, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, 
                                default=0, verbose_name='Цена', blank=True, null=True)
    qty = models.IntegerField(default=0, verbose_name="Количество в наличии")
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="slug", blank=True, null=True)
    img = models.ImageField(upload_to="static/media/", blank=True, null=True, verbose_name="Изображение")
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name + "-" + str(self.id))
        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'



        