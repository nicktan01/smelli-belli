from django.contrib import admin
from .models import Product, Scent

# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass

@admin.register(Scent)
class ScentAdmin(admin.ModelAdmin):
    pass