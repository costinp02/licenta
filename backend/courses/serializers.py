from rest_framework import serializers

from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'id',
            'name',
            'credit_number',
            'optional',
            'year'
        ]

class CourseOnlyIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id']
