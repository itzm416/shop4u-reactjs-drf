from django.db import models
from django.contrib.auth.models import AbstractUser
from account.manager import MyUserManager

class MyUser(AbstractUser):
    username = None
    email = models.EmailField(verbose_name='Email Address', unique=True)
    
    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class Token(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE)
    token = models.CharField(max_length=150)





