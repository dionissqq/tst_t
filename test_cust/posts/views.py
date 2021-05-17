from .serializer import PostSerializer
from .models import Post, Like
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .utils import daterange

from datetime import datetime
# Create your views here.

class PostView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Post.objects.all()
        liked_posts = Post.objects.filter(
            liked_by__in = [request.user]
        ).values_list('id', flat=True)
        serializer = PostSerializer(posts, many=True)
        return Response({'posts':serializer.data, 'liked_posts_ids':liked_posts})

    def post(self, request, *args, **kwargs):
        data = request.data
        data['user_id'] = request.user.id
        print(data)
        posts_serializer = PostSerializer(data=data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        try:
            post_id = request.data['post_id']
            if Like.objects.filter(user = user, post=post_id).exists():
                user.liked_posts.remove(post_id)
            else:
                user.liked_posts.add(post_id)
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class AnalyticView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            start_date = datetime.strptime(request.query_params['from'], '%Y-%m-%d')
            end_date = datetime.strptime(request.query_params['to'], '%Y-%m-%d')
            user = request.user
            posts = Post.objects.filter(user_id = user.id)
            res = {}
            for post in posts:
                date_likes = {}
                for single_date in daterange(start_date, end_date):
                    date_likes[single_date.strftime("%Y-%m-%d")] = Like.objects.filter(
                        post=post, 
                        created_at__date = single_date
                    ).count()
                res[post.id] = date_likes
            return Response(res, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
