from django.db import models


class Course(models.Model):
    class CourseType(models.TextChoices):
        LECTURE = "LECTURE", "Lecture"
        SEMINAR = "SEMINAR", "Seminar"
        LABORATORY = "LABORATORY", "Laboratory"

    name = models.TextField(max_length=75, blank=False)
    course_type = models.CharField(max_length=15, choices=CourseType.choices)
    credit_number = models.IntegerField()
    optional = models.BooleanField(default=False)
    year = models.IntegerField()

    def __str__(self) -> str:
        return self.name


