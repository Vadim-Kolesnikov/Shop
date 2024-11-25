def recalc(cart):
    cart_products = cart.products.all()
    total = 0
    for cart_product in cart_products:
        cart_product_qty = cart_product.qty
        cart_product_price = cart_product.product.price
        total += cart_product_qty * cart_product_price
    cart.total = total 
    cart.save()


def clean_cart(cart):
    cart_products = cart.products.all()
    for cart_product in cart_products:
        cart_product.delete()

def order_confirmation(order, cart):
    order_products = order.products.all()
    clean_cart(cart)
    for order_product in order_products:
        product = order_product.product
        product.qty -= order_product.qty
        product.save()

    order.is_paid = True
    order.save()
    cart.in_order = False
    cart.save()