from django.db import models

class Classroom(models.Model):
    name = models.CharField(max_length=50, blank=False)
    capacity = models.IntegerField()
    floor = models.IntegerField()

    def __str__(self) -> str:
        return self.name

# Create your models here.
