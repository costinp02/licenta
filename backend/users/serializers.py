from rest_framework import serializers

from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'role'
        ]

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

# class StudentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = StudentProfile
#         fields = [
#             'user',
#             'program',
#             'year',
#             'group'
#         ]