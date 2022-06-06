from django.contrib import admin
from .models import Question, Answer, Quiz, Cart, WishList
# Register your models here.

class AnswerInline(admin.TabularInline):
    model = Answer


class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]

admin.site.register(Quiz)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer)
admin.site.register(Cart)
admin.site.register(WishList)