from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

# Create your models here.
class Size(models.Model):
    ONE_FL_OZ = "1.0 fl oz"
    TWO_FL_OZ = "2.0 fl oz"
    FOUR_FL_OZ = "4.0 fl oz"
    SIZE_CHOICES = [
        (ONE_FL_OZ, "1.0 fl oz"),
        (TWO_FL_OZ, "2.0 fl oz"),
        (FOUR_FL_OZ, "4.0 fl oz"),
    ]
    sizes = models.CharField(
        max_length=25,
        choices=SIZE_CHOICES,
        default=''
    )


class Product(models.Model):
    name = models.CharField(max_length=50)
    sku = models.CharField(max_length=12, unique=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    size = models.ForeignKey(
        Size,
        related_name="products",
        on_delete=models.PROTECT
    )
    # rating = models.PositiveSmallIntegerField()
    # rating should be its own model, like in Srumptious Recipes
    # tags = models.CharField(max_length=50)
    # tags should be its own app with its own models, like in Scrumptious Recipes
    ingredients = models.CharField(max_length=500)
    limited_item = models.BooleanField()
    image = models.URLField()
    description = models.CharField(max_length=400)
    usage = models.CharField(max_length=100)
    storage = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


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
