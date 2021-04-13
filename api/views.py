from django.shortcuts import render
from django.contrib.auth import authenticate

from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User
from .serializers import *


class Register(APIView):

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        if user is None:
            return Response("invalid credential or user already exist")

        refresh = RefreshToken.for_user(user)


        res = {
            "email": user.email,
            "refresh":str(refresh),
            "access":str(refresh.access_token),
        }

        return Response(res)

class Login(APIView):

    def post(self, request):

        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user =  serializer.save()

        refresh = RefreshToken.for_user(user)


        res = {
            "email": user.email,
            "refresh":str(refresh),
            "access":str(refresh.access_token),
        }

        return Response(res)