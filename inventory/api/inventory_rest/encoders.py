from common.json import ModelEncoder
from .models import Product, Scent, Size


class SizeEncoder(ModelEncoder):
    model = Size
    properties = [
        "id",
        "sizes"
    ]

class ProductListEncoder(ModelEncoder):
    model = Product
    properties = [
        "id",
        "name",
        "sku",
        "price",
        "size",
    ]
    encoders = {
        "size": SizeEncoder
    }

    def get_extra_data(self, o):
        return {
            "price": float(o.price),
            "size": o.size.sizes
        }

class ProductDetailEncoder(ModelEncoder):
    model = Product
    properties = [
        "id",
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
    ]
    encoders = {
        "size": SizeEncoder
    }

    def get_extra_data(self, o):
        return {
            "price": float(o.price),
            "size": o.size.sizes
        }

class ScentEncoder(ModelEncoder):
    model = Scent
    properties = ["id", "scents", "product"]
    encoders = {
        "product": ProductListEncoder
    }

    def get_extra_data(self, o):
        return {
            "product": {
                "name": o.product.name,
            }
        }