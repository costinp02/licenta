from django.db import models
from users.models import User, Teacher
from courses.models import Course
from classrooms.models import Classroom
# Create your models here.

class Schedule(models.Model):
    time = models.CharField(max_length=25, blank=True)
    course = models.OneToOneField(Course, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
