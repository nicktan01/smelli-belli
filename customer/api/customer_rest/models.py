from django.db import models
# Create your models here.

class ProductVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=50)
    sku = models.CharField(max_length=12, unique=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    image = models.URLField()

class ScentVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=50)
    
class UserVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    user = models.CharField

class Quiz(models.Model):
    topic = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.topic}"

    def get_questions(self):
        return self.question_set.all()
        
class Question(models.Model):
    text = models.CharField(max_length=200)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.text}"
    
    def get_answers(self):
        return self.answer_set.all()


class Answer(models.Model):
    text = models.CharField(max_length=200)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    scent = models.CharField(max_length=20)
    
    def __str__(self):
        return f"question: {self.question.text}, answer: {self.text}"


class Result(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    user = models.ForeignKey(UserVO, on_delete=models.CASCADE)
    recommendation = models.ForeignKey(ProductVO, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.pk)