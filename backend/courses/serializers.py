from rest_framework import serializers

from .models import Course
from users.models import User, Teacher
from users.serializers import TeacherEditSerializer, TeacherOnlyIDSerializer

class CourseSerializer(serializers.ModelSerializer):
    teacher = serializers.PrimaryKeyRelatedField(queryset=Teacher.objects.all())
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


class CourseDetailSerializer(serializers.ModelSerializer):
    teacher = TeacherEditSerializer()
    class Meta:
        model = Course
        fields  = [
            'id',
            'name',
            'course_type',
            'teacher',
            'credit_number',
            'optional',
            'program',
            'year'
        ]

        

    