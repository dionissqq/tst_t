from django.utils.timezone import now
from rest_framework import status
from .models import MyUser
import json

class LastVisitMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        body = request.body
        response = self.get_response(request)

        if request.user.is_authenticated:
            MyUser.objects.filter(pk=request.user.pk).update(last_request=now())

        if request.path=='/api/token/'and response.status_code == status.HTTP_200_OK:
            MyUser.objects.filter(username=json.loads(body)['username']).update(last_login=now())

        return response