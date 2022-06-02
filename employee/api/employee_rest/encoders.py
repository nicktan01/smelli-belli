from common.json import ModelEncoder
from .models import ProductVO, Order, CustomerVO

class ProductVOEncoder(ModelEncoder):
    model = ProductVO
    properties = [
        "name",
        "sku",
        "price",
        "quantity",
        "ingredients",
        "limited_item",
        "created",
        "image",
        "description",
        "usage",
        "storage",

    ]

class CustomerVOEncoder(ModelEncoder):
    pass

class OrderEncoder(ModelEncoder):
    model = Order
    properties = [
        "products",
        "quantity",
        "totals",
        "order_number",
        "customer",
        "created"
    ]
    encoders = {
        "products": ProductVOEncoder(),
        "customer": CustomerVOEncoder(),
    }
