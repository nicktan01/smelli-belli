from django.urls import reverse
from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)

    def get_api_url(self):
        return reverse("api_account_detail", kwargs={"email": self.email})
        # This sets the User's href to the email address, as set up
        # in urls.py
