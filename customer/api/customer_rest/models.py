from django.db import models
# Create your models here.

class ProductVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=50)
    sku = models.CharField(max_length=12, unique=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    image = models.URLField()
    
class UserVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    user = models.CharField

class BodyQuiz(models.Model):
    answer_1 = models.CharField(max_length=25)
    answer_2 = models.CharField(max_length=25)
    answer_3 = models.CharField(max_length=25)
    answer_4 = models.CharField(max_length=25)
    answer_5 = models.CharField(max_length=25)

class Cart(models.Model):
    product = models.ForeignKey(
        ProductVO,
        related_name="cart",
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(UserVO, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField()
    totals = models.DecimalField(max_digits=5, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)


class WishList(models.Model):
    user = models.ForeignKey(UserVO, on_delete=models.CASCADE)
    product = models.ForeignKey(ProductVO, related_name="wishlist", on_delete=models.CASCADE)