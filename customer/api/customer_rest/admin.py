from django.contrib import admin
from .models import BodyQuiz, Cart, WishList, ProductVO
# Register your models here.


@admin.register(ProductVO)
class ProductVOAdmin(admin.ModelAdmin):
    pass

@admin.register(BodyQuiz)
class BodyQuizAdmin(admin.ModelAdmin):
    pass

admin.site.register(Cart)
admin.site.register(WishList)