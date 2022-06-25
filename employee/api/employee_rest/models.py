from django.db import models


class ProductVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=50)
    size = models.CharField(max_length=25)
    sku = models.CharField(max_length=12, unique=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    quantity = models.PositiveSmallIntegerField()
    image = models.URLField(null=True)


class LineItem(models.Model):
    product = models.ForeignKey(ProductVO, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField()


class Order(models.Model):
    products = models.ManyToManyField(LineItem, null=True)
    user = models.IntegerField(null=True)
    # quantity = models.PositiveSmallIntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    order_number = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True, null=True)
