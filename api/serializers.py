from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import User

class LoginSerializer(serializers.Serializer):

    email = serializers.CharField(max_length=250)
    password = serializers.CharField(max_length=100)

    def save(self, **kwargs):

        user = authenticate(
            email = self.validated_data["email"],
            password = self.validated_data["password"]
        )

        if user is None:
            raise serializers.ValidationError("invalid credentials")
        
        return user


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["email", "first_name", "last_name", "phone_number", "password"]

    def save(self, **kwargs):
        try:
            user = User(
                email = self.validated_data["email"],
                first_name = self.validated_data["first_name"],
                last_name = self.validated_data["last_name"],
                phone_number = self.validated_data["phone_number"],
            )

            user.set_password(self.validated_data["password"])
            user.save()

            return user
        except:
            return None


