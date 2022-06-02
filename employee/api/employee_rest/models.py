from tkinter import CASCADE
from django.db import models


class SizeVO(models.Model):
    pass
class ProductVO(models.Model):
    name = models.CharField(max_length=50)
    sku = models.CharField(max_length=12, unique=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    size = models.ForeignKey(
        Size,
        related_name="products",
        on_delete=models.PROTECT
    )
    quantity = models.PositiveSmallIntegerField()
    ingredients = models.CharField(max_length=500)
    limited_item = models.BooleanField()
    image = models.URLField()
    description = models.CharField(max_length=400)
    usage = models.CharField(max_length=100)
    storage = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class CustomerVO(models.Model):
    pass

class Order(models.Model):
    products = models.ForeignKey(
        ProductVO,
        related_name="order",
        on_delete=CASCADE
    )
    quantity = models.PositiveSmallIntegerField()
    totals = models.DecimalField()
    order_number = models.IntegerField()
    customer = models.ForeignKey(
        CustomerVO,
        related_name="order"
        on_delete=CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)
