from rest_framework import serializers
from users.serializers import TeacherEditSerializer
from courses.serializers import CourseSerializer, CourseDetailSerializer
from classrooms.serializers import ClassroomSerializer

from .models import Schedule

class ScheduleCreateSerializer(serializers.ModelSerializer):
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
    
class ScheduleViewSerializer(serializers.ModelSerializer):
    course = CourseDetailSerializer()
    classroom = ClassroomSerializer()
    class Meta:
        model = Schedule
        fields = [
            'id',
            'day_of_week',
            'time',
            'course',
            'classroom',
        ]