from rest_framework import serializers

from .models import User, StudentProfile

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = [
            'user',
            'program',
            'year',
            'group'
        ]