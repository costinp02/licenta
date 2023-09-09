from rest_framework import serializers
from users.serializers import TeacherEditSerializer
from courses.serializers import CourseSerializer
from classrooms.serializers import ClassroomSerializer

from .models import Schedule

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        course = CourseSerializer
        teacher = TeacherEditSerializer
        classroom = ClassroomSerializer
        fields = [
            'id',
            'day_of_week',
            'time',
            'course',
            'classroom'
        ]

    def create(self, validated_data):
        return super().create(validated_data)
    
