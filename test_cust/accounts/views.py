from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.hashers import make_password

from .models import MyUser

# Create your views here.
class RegisterView(APIView):

    def post(self,request):
        data = request.data
        try:
            MyUser.objects.create(
                username = data['username'],
                email = data['email'],
                password = make_password(data['password'])
            )
            return Response(status = status.HTTP_201_CREATED)
        except KeyError:
            return Response(
                {'error':'send all fields'},
                status = status.HTTP_400_BAD_REQUEST)
        except BaseException:
            return Response(
                {'error':'change data'},
                status = status.HTTP_400_BAD_REQUEST)

class ActivityView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        print(user.last_login)
        return Response(
            {
                'last_login':user.last_login,
                'last_request':user.last_request,
            },
            status = status.HTTP_200_OK
        )