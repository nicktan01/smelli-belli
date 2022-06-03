from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

# Create your models here.
class Size(models.Model):
    ONE_FL_OZ = "1.0 fl oz"
    TWO_FL_OZ = "2.0 fl oz"
    FOUR_FL_OZ = "4.0 fl oz"
    EIGHT_FL_OZ = "8.0 fl oz"
    SIXTEEN_FL_OZ = "16.0 fl oz"
    ONE_OZ = "1.0 oz"
    TWO_OZ = "2.0 oz"
    FOUR_OZ = "4.0 oz"
    EIGHT_OZ = "8.0 oz"
    SIXTEEN_OZ = "16.0 oz"
    SIZE_CHOICES = [
        (ONE_FL_OZ, "1.0 fl oz"),
        (TWO_FL_OZ, "2.0 fl oz"),
        (FOUR_FL_OZ, "4.0 fl oz"),
        (EIGHT_FL_OZ, "8.0 fl oz"),
        (SIXTEEN_FL_OZ, "16.0 fl oz"),
        (ONE_OZ, "1.0 oz"),
        (TWO_OZ, "2.0 oz"),
        (FOUR_OZ, "4.0 oz"),
        (EIGHT_OZ, "8.0 oz"),
        (SIXTEEN_OZ, "16.0 oz"),
    ]
    sizes = models.CharField(
        max_length=25,
        choices=SIZE_CHOICES,
        default=''
    )

    def __str__(self):
        return f"{self.sizes}"


class Product(models.Model):
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

    def __str__(self):
        return f"{self.name} - {self.size}, {self.sku}"


class Scent(models.Model):
    FRESH = 'Fresh'
    AMBER = 'Amber'
    FLORAL = 'Floral'
    WOODY = 'Woody'
    FRUITY = 'Fruity'
    GOURMAND = 'Gourmand'
    SCENT_CHOICES = [
        (FRESH, 'Fresh'),
        (AMBER, 'Amber'),
        (FLORAL , 'Floral'),
        (WOODY , 'Woody'),
        (FRUITY , 'Fruity'),
        (GOURMAND, 'Gourmand')
    ]
    scents = models.CharField(
        max_length=25,
        choices=SCENT_CHOICES,
        default=FRESH,
    )
    product = models.ForeignKey(
        Product,
        related_name="scents",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.scents} associated with {self.product}"
