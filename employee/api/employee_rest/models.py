from django.db import models

class ProductVO(models.Model):
    name = models.CharField(max_length=50)
    sku = models.CharField(max_length=12, unique=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    size = models.CharField(max_length=25)
    quantity = models.PositiveSmallIntegerField()
    limited_item = models.BooleanField()
    image = models.URLField()
    import_href = models.CharField(max_length=200, unique=True)


class UserVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    username = models.CharField(max_length=200, unique=True)
    email = models.CharField(max_length=250, unique=True)
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)

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
        UserVO,
        related_name="order",
        on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)
