from django.db import models
from django.contrib.auth import get_user_model
from main.models import Product
from django.dispatch import receiver
from django.db.models.signals import post_save, m2m_changed, pre_delete
from .utils import recalc, order_confirmation
from payment.models import Order, OrderPayment


User = get_user_model()


class CartProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Товар')
    qty = models.IntegerField(verbose_name='Количество')

    def __str__(self):
        return f'Продукт корзины {self.product.name} {self.product.qty}'
    
    class Meta:
        verbose_name = 'Продукт корзины'
        verbose_name_plural = 'Продукты корзины'



class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    products = models.ManyToManyField(CartProduct, verbose_name='Товары')
    total = models.DecimalField(max_digits=10, decimal_places=2, 
                                default=0, verbose_name='Цена')
    in_order = models.BooleanField(default=False, verbose_name='Находится ли заказ с такой корзиной в ожидании оплаты')
    
    def __str__(self):
        return f'Корзина пользователя {self.user.username}'
    
    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'


class WishList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    products = models.ManyToManyField(Product, verbose_name='Товары')

    def __str__(self):
        return f'Список желаемого пользователя {self.user.username}'
    
    class Meta:
        verbose_name = 'Список желаемого'
        verbose_name_plural = 'Списки желаемого'


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, verbose_name='Корзина')
    wish_list = models.ForeignKey(WishList, on_delete=models.CASCADE, verbose_name='Список желаемого')
    orders = models.ManyToManyField(Order, verbose_name='Заказы')

    def __str__(self):
        return f'Профиль пользователя {self.user.username}'
    
    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created: 
        cart = Cart.objects.create(user=instance)
        cart.save()
        wish_list = WishList.objects.create(user=instance)
        wish_list.save()
        Profile.objects.create(
            user=instance, 
            cart=cart, 
            wish_list=wish_list
        )
        
        
@receiver(m2m_changed, sender=Cart.products.through)
def recalc_cart_when_new_prod_added(sender, instance, action, *args, **kwargs):
    if action == 'post_add' or action == 'post_remove':
        recalc(instance)
        


@receiver(post_save, sender=CartProduct)
def recalc_cart_when_prod_in_cart_updated(sender, instance, created, **kwargs):
    cart = Cart.objects.filter(products__in=[instance])
    if cart.exists():
        cart = cart[0]
        recalc(cart)
        
        
                
@receiver(pre_delete, sender=CartProduct)
def recalc_cart_when_cart_product_deleted(sender, instance, **kwargs):
    cart = Cart.objects.filter(products__in=[instance])
    if cart.exists():
        cart = cart[0]
        cart_product_price = instance.product.price * instance.qty
        cart.total -= cart_product_price
        cart.save()


@receiver(post_save, sender=Product)
def change_cart_product_qty_when_product_qty_chanded(sender, instance, **kwargs):
    cart_products = CartProduct.objects.filter(product=instance)
    if cart_products.exists():
        for cart_product in cart_products: 
            if cart_product.qty > instance.qty:
                cart_product.qty = instance.qty
                cart_product.save()
                if cart_product.qty == 0:
                    cart_product.delete()


@receiver(post_save, sender=OrderPayment)
def change_cart_product_qty_when_product_qty_chanded(sender, instance, **kwargs):
    if instance.status == 'succeeded':
        order = instance.order
        cart = Cart.objects.get(user=order.user)
        order_confirmation(order, cart)
    elif instance.status == 'canceled':
        order = instance.order
        user = order.user
        cart = Cart.objects.get(user=user)
        cart.in_order = False
        cart.save()
        order.delete()


