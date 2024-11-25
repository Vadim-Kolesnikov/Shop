import uuid
from yookassa import Payment
from accounts.models import Cart
from .models import OrderProduct, Order

def create_payment(value, currency, redirect_url, des):
    payment = Payment.create({
        "amount": {
            "value": value,
            "currency": currency
        },
        "confirmation": {
            "type": "redirect",
            "return_url": redirect_url
        },
        "capture": True,
        "description": des
    }, uuid.uuid4())

    return payment


def create_order(user, address, delivery_type, status):
    cart_products = Cart.objects.get(user=user).products.all()

    order = Order.objects.create(
        user=user,
        address=address,
        delivery_type=delivery_type,
        status=status,
        is_paid=False
    )

    total = 0
    for cart_product in cart_products:
        order_product = OrderProduct(
            product=cart_product.product,
            qty=cart_product.qty,
        )
        total += cart_product.product.price * cart_product.qty
        order_product.save()
        order.products.add(order_product)

    total += delivery_type.price
    order.total = total
    order.save()
    return order






