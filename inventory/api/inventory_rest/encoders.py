from common.json import ModelEncoder
from .models import Product, Scent, Size

class ProductEncoder(ModelEncoder):
    model = Product
    properties = [
        "name",
        "sku",
        "price",
        "rating",
        "quantity",
        "tags",
        "ingredients",
        "limited_item",
        "created",
        "image",
        "description",
        "usage",
        "storage",

    ]

class ScentEncoder(ModelEncoder):
    pass

class SizeEncoder(ModelEncoder):
    pass