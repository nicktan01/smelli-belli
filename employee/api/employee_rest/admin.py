from django.contrib import admin
from .models import ProductVO, Order, UserVO

@admin.register(ProductVO)
class ProductVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass

@admin.register(UserVO)
class UserVOAdmin(admin.ModelAdmin):
    pass
