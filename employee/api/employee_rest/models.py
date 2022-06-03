from django.db import models

class SizeVO(models.Model):
    sizes = models.CharField(max_length=25)
    import_href = models.CharField(max_length=200, unique=True)

class ProductVO(models.Model):
    name = models.CharField(max_length=50)
    sku = models.CharField(max_length=12, unique=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    size = models.ForeignKey(
        SizeVO,
        related_name="products",
        on_delete=models.PROTECT
    )
    quantity = models.PositiveSmallIntegerField()
    limited_item = models.BooleanField()
    image = models.URLField()
    import_href = models.CharField(max_length=200, unique=True)

class CustomerVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)

class Order(models.Model):
    products = models.ForeignKey(
        ProductVO,
        related_name="order",
        on_delete=models.CASCADE
    )
    quantity = models.PositiveSmallIntegerField()
    totals = models.DecimalField(max_digits=10, decimal_places=2)
    order_number = models.IntegerField()
    customer = models.ForeignKey(
        CustomerVO,
        related_name="order",
        on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)
