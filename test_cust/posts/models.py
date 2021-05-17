from django.db import models
from django.conf import settings
from django.utils import timezone
User = settings.AUTH_USER_MODEL

# Create your models here.
class Post(models.Model):
    user_id = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        blank=True, 
        null = True
    )
    text = models.CharField(max_length=32)
    image = models.ImageField(upload_to='post_images')

    liked_by = models.ManyToManyField(
        User, 
        through='Like', 
        related_name='liked_posts'
    )

class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    created_at = models.DateTimeField(default=timezone.now)