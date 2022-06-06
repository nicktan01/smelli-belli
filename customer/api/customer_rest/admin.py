from django.contrib import admin
from .models import Question, Answer, Quiz, Cart, WishList, ProductVO
# Register your models here.

class AnswerInline(admin.TabularInline):
    model = Answer

class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]

@admin.register(ProductVO)
class ProductVOAdmin(admin.ModelAdmin):
    pass

admin.site.register(Quiz)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer)
admin.site.register(Cart)
admin.site.register(WishList)
