from django.contrib.auth.models import AbstractUser
from django.db.models.fields import DateTimeField
# Create your models here.

class MyUser(AbstractUser):
    last_request = DateTimeField(null = True)
    last_login = DateTimeField(null = True)

    def __str__(self) -> str:
        return self.username