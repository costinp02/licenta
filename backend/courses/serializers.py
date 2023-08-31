from rest_framework import serializers

from .models import Course
from users.serializers import TeacherEditSerializer

class CourseSerializer(serializers.ModelSerializer):
    teacher = TeacherEditSerializer()
    class Meta:
        model = Course
        fields = [
            'id',
            'name',
            'course_type',
            'teacher',
            'credit_number',
            'optional',
            'program',
            'year'
        ]

class CourseOnlyIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id']
