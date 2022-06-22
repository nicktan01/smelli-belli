from django.db import models
# Create your models here.

class ProductVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=50)
    sku = models.CharField(max_length=12, unique=True)
    price = models.FloatField()
    image = models.URLField()

class BodyQuiz(models.Model):
    answer_1 = models.CharField(max_length=50)
    answer_2 = models.CharField(max_length=50)
    answer_3 = models.CharField(max_length=50)
    answer_4 = models.CharField(max_length=50)
    answer_5 = models.CharField(max_length=50)
    created = models.DateField(auto_now_add=True)
    user = models.IntegerField(null=True)

class HomeQuiz(models.Model):
    answer_1 = models.CharField(max_length=50)
    answer_2 = models.CharField(max_length=50)
    answer_3 = models.CharField(max_length=50)
    answer_4 = models.CharField(max_length=50)
    answer_5 = models.CharField(max_length=50)
    created = models.DateField(auto_now_add=True)
    user = models.IntegerField(null=True)

class Cart(models.Model):
    product = models.ForeignKey(
        ProductVO,
        related_name="cart",
        on_delete=models.CASCADE,
    )
    user = models.IntegerField(null=True) # changed this to match the changes from the quiz models. check ./views.py to see how the user information was grabbed out of the token
    created = models.DateField(auto_now_add=True)


class WishList(models.Model):
    user = models.IntegerField(null=True) # same as line 35 on user prop for cart
    product = models.ForeignKey(ProductVO, related_name="wishlist", on_delete=models.CASCADE)