from tkinter import CASCADE
from django.db import models


class ProductVO(models.Model):
    name = models.CharField(max_length=50, unique=True)
    sku = models.CharField()
    price = models.DecimalField()
    rating = models.PositiveSmallIntegerField()
    size = models.PositiveSmallIntegerField()
    quantity = models.PositiveSmallIntegerField()
    tags = models.CharField(max_length=50)
    ingredients = models.CharField(max_length=100)
    limited_item = models.BooleanField()
    created = models.DateTimeField()
    image = models.URLField()
    description = models.CharField(max_length=200)
    usage = models.CharField(max_length=50)
    storage = models.CharField(max_length=50)

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
