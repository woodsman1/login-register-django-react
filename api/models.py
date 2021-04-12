from django.db import models

# Create your models here.
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser, PermissionsMixin)

class UserManager(BaseUserManager):

    def create_user(self, email, first_name, last_name, phone_number ,password=None):
        """
        Create and saves a user with email and hashed password
        """

        if not email:
           raise ValueError("user must have email address")
        
        user =  self.model(
            email = self.normalize_email(email),
            first_name = first_name,
            last_name = last_name,
            phone_number = phone_number,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user 

    def create_superuser(self, email, first_name, last_name, phone_number, password=None):
        """
        Create and save a superuser with the email, password
        """
        user = self.create_user(
            email,
            first_name,
            last_name,
            phone_number,
            password
        )

        user.is_staff = True
        user.is_superuser = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=250, unique=True)
    
    first_name = models.CharField(max_length=250) 
    last_name = models.CharField(max_length=250) 
    phone_number = models.IntegerField()

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', "last_name", "phone_number"]

    object = UserManager()

    def __str__(self):
        return self.email