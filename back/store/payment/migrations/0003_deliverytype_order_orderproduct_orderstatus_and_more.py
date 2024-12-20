# Generated by Django 5.1.2 on 2024-11-17 18:55

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_alter_product_img'),
        ('payment', '0002_alter_orderpayment_status'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='DeliveryType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Название')),
                ('price', models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name='Цена')),
                ('time', models.IntegerField(default=0, verbose_name='Время доставки (в днях)')),
            ],
            options={
                'verbose_name': 'Типы доставки',
                'verbose_name_plural': 'Типы доставки',
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.TextField(verbose_name='Адрес доставки')),
                ('total', models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name='Цена')),
                ('is_paid', models.BooleanField(default=False, verbose_name='Оплата')),
                ('delivery_type', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='payment.deliverytype', verbose_name='Тип доставки')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Заказ',
                'verbose_name_plural': 'Заказы',
            },
        ),
        migrations.CreateModel(
            name='OrderProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qty', models.IntegerField(verbose_name='Количество')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.product', verbose_name='Товар')),
            ],
            options={
                'verbose_name': 'Продукт заказа',
                'verbose_name_plural': 'Продукты заказа',
            },
        ),
        migrations.CreateModel(
            name='OrderStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Название')),
                ('des', models.TextField(verbose_name='Описание')),
            ],
            options={
                'verbose_name': 'Статус заказа',
                'verbose_name_plural': 'Статусы заказа',
            },
        ),
        migrations.DeleteModel(
            name='PaymentStatus',
        ),
        migrations.AddField(
            model_name='order',
            name='products',
            field=models.ManyToManyField(to='payment.orderproduct', verbose_name='Товары'),
        ),
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='payment.orderstatus', verbose_name='Статус'),
        ),
    ]
