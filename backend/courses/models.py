from django.db import models
from users.models import User,Teacher

class Course(models.Model):
    class CourseType(models.TextChoices):
        LECTURE = "LECTURE", "Lecture"
        SEMINAR = "SEMINAR", "Seminar"
        LABORATORY = "LABORATORY", "Laboratory"

    class Program(models.TextChoices):
        MATH = "MATH", "Mathematics"
        CS = "CS", "Computer Science"
        CTI = "CTI", "Computers and Information Technology"
        DEFAULT = "DEFAULT", "Default"

    name = models.TextField(max_length=75, blank=False)
    course_type = models.CharField(max_length=15, choices=CourseType.choices, default=CourseType.LECTURE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    credit_number = models.IntegerField()
    optional = models.BooleanField(default=False)
    program = models.CharField(max_length=45, choices=Program.choices, default=Program.DEFAULT)
    year = models.IntegerField()

    def __str__(self) -> str:
        return self.name


