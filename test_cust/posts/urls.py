from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostView.as_view(), name= 'posts_list'),
    path('like/', views.LikeView.as_view()),
    path('analytics/', views.AnalyticView.as_view()),
]