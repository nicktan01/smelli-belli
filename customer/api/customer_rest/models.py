from django.db import models
# Create your models here.

class ProductVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=50)
    sku = models.CharField(max_length=12, unique=True)
    price = models.FloatField()
    image = models.URLField()
    
class UserVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    user = models.CharField(max_length=50)

class BodyQuiz(models.Model):
    answer_1 = models.CharField(max_length=50)
    answer_2 = models.CharField(max_length=50)
    answer_3 = models.CharField(max_length=50)
    answer_4 = models.CharField(max_length=50)
    answer_5 = models.CharField(max_length=50)
    created = models.DateField(auto_now_add=True)
    # user = models.ForeignKey(
    #     UserVO,
    #     related_name="body_quiz",
    #     on_delete=models.CASCADE,
    #     blank=True,
    #     null=True
    # )

class HomeQuiz(models.Model):
    answer_1 = models.CharField(max_length=50)
    answer_2 = models.CharField(max_length=50)
    answer_3 = models.CharField(max_length=50)
    answer_4 = models.CharField(max_length=50)
    answer_5 = models.CharField(max_length=50)
    created = models.DateField(auto_now_add=True)
    # user = models.ForeignKey(
    #     UserVO,
    #     related_name="home_quiz",
    #     on_delete=models.CASCADE,
    #     blank=True,
    #     null=True
    # )

class Cart(models.Model):
    product = models.ForeignKey(
        ProductVO,
        related_name="cart",
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(UserVO, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField()
    totals = models.FloatField()
    created = models.DateTimeField(auto_now_add=True)


class WishList(models.Model):
    user = models.ForeignKey(UserVO, on_delete=models.CASCADE)
    product = models.ForeignKey(ProductVO, related_name="wishlist", on_delete=models.CASCADE)