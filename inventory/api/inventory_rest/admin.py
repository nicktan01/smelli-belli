from django.contrib import admin
from .models import Product, Scent, Size

# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass

@admin.register(Scent)
class ScentAdmin(admin.ModelAdmin):
    pass

@admin.register(Size)
class SizeAdin(admin.ModelAdmin):
    pass