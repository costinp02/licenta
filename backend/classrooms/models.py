from django.db import models

class Classroom(models.Model):
    name = models.CharField(max_length=50, blank=False)
    capacity = models.IntegerField()
    floor = models.IntegerField()

# Create your models here.
