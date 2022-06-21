from django.urls import reverse
from django.db import models

# Create your models here.
class Product(models.Model):
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
    FRESH = "Fresh"
    AMBER = "Amber"
    FLORAL = "Floral"
    WOODY = "Woody"
    FRUITY = "Fruity"
    SCENT_CHOICES = [
        ("", "-----------"),
        (FRESH, "Fresh"),
        (AMBER, "Amber"),
        (FLORAL, "Floral"),
        (WOODY, "Woody"),
        (FRUITY, "Fruity"),
    ]
    HOME = "Home"
    BODY = "Body"
    PRODUCT_TYPE_CHOICES = [
        ("", "-----------"),
        (HOME, "Home"),
        (BODY, "Body"),
    ]
    CANDLE = "Candle"
    INCENSE_STICK = "Incense Stick"
    ROOM_SPRAY = "Room Spray"
    LOTION = "Lotion"
    BODY_WASH = "Body Wash"
    SOAP = "Soap"
    DEODORANT = "Deodorant"
    PRODUCT_CATEGORY_CHOICES = [
        ("", "-----------"),
        (CANDLE, "Candle"),
        (INCENSE_STICK, "Incense Stick"),
        (ROOM_SPRAY, "Room Spray"),
        (LOTION, "Lotion"),
        (BODY_WASH, "Body Wash"),
        (SOAP, "Soap"),
        (DEODORANT, "Deodorant"),
    ]
    name = models.CharField(max_length=50)
    product_type = models.CharField(
        max_length=50, choices=PRODUCT_TYPE_CHOICES, default=""
    )
    product_category = models.CharField(
        max_length=25, choices=PRODUCT_CATEGORY_CHOICES, default=""
    )
    size = models.CharField(max_length=25, choices=SIZE_CHOICES, default="")
    sku = models.CharField(max_length=12, unique=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    scent1 = models.CharField(max_length=25, choices=SCENT_CHOICES, blank=True)
    scent2 = models.CharField(
        max_length=25,
        choices=SCENT_CHOICES,
        blank=True,
    )
    quantity = models.PositiveSmallIntegerField()
    image = models.URLField(blank=True, null=True)
    description = models.CharField(max_length=400)
    
    def __str__(self):
        return f"{self.name} - {self.size}, {self.sku}"

    # This function returns the href for a Product when an api_show_product
    # request is made, storing it in the JSON response
    def get_api_url(self):
        return reverse("api_show_product", kwargs={"sku": self.sku})  # SKU!

    class Meta:
        ordering = ("size", "name")  # Order Products first by size, then name
