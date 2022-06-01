from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=50, unique=True)
    sku = models.CharField(max_length=12, unique=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    rating = models.PositiveSmallIntegerField()
    quantity = models.PositiveSmallIntegerField()
    tags = models.CharField(max_length=50)
    ingredients = models.CharField(max_length=100)
    limited_item = models.BooleanField()
    created = models.DateTimeField()
    image = models.URLField()
    description = models.CharField(max_length=400)
    usage = models.CharField(max_length=100)
    storage = models.CharField(max_length=100)


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
    product = models.ForeignKey(
        Product,
        related_name="sizes",
        on_delete=models.CASCADE
    )


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
