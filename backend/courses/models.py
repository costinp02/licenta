from django.db import models


class Course(models.Model):
    name = models.TextField(max_length=75, blank=False)
    credit_number = models.IntegerField()
    optional = models.BooleanField(default=False)
    year = models.IntegerField()
# Create your models here.
