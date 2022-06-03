from django.contrib import admin
from .models import ProductVO, Order

@admin.register(ProductVO)
class ProductVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass
