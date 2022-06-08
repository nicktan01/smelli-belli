from common.json import ModelEncoder
from .models import Product, Size


class SizeEncoder(ModelEncoder):
    model = Size
    properties = [
        "id",
        "sizes"
    ]

class ProductListEncoder(ModelEncoder):
    model = Product
    properties = [
        "name",
        "product_type"
        "sku",
        "price",
        "size",
        "image",
        "quantity",
        "limited_item"
    ]
    encoders = {
        "size": SizeEncoder()
    }

    def get_extra_data(self, o):
        return {
            "price": float(o.price),
            "size": o.size.sizes
        }

class ProductDetailEncoder(ModelEncoder):
    model = Product
    properties = [
        "name",
        "product_type"
        "sku",
        "price",
        "size",
        "scent1",
        "scent2",
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
    encoders = {
        "size": SizeEncoder()
    }

    def get_extra_data(self, o):
        return {
            "price": float(o.price),
            "size": o.size.sizes
        }
