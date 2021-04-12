from django.urls import path
from .views import *

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

app_name = "api"

urlpatterns = [
    path("register/", Register.as_view() ),
    path("login/", Login.as_view() ),
    path('token/refresh/', TokenRefreshView.as_view() ),
]