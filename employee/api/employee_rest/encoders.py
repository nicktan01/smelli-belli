from common.json import ModelEncoder
from .models import ProductVO, Order, CustomerVO

class ProductVOEncoder(ModelEncoder):
    model = ProductVO
    properties = [
        "name",
        "sku",
        "price",
        "size",
        "quantity",
        "ingredients",
        "limited_item",
        "image",
        "description",
        "usage",
        "storage",
        "created",
        "updated"
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
