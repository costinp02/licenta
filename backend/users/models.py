from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager




class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        STUDENT = "STUDENT", "Student"
        TEACHER = "TEACHER", "Teacher"

    base_role = Role.ADMIN

    username = models.EmailField(unique=True)
    role = models.CharField(max_length=50, choices=Role.choices, default=base_role)

    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"

    
class Student(models.Model):
    class Year(models.IntegerChoices):
        YEAR1 = 1, "YEAR 1"
        YEAR2 = 2, "YEAR 2"
        YEAR3 = 3, "YEAR 3"
        YEAR4 = 4, "YEAR 4"

    class Program(models.TextChoices):
        MATH = "MATH", "Mathematics"
        APPLIED_MATH = "APPLIEDMATH", "Applied Mathematics"
        CS_MATH = "CSMATH", "Mathematics and Computer Science"
        CS = "CS", "Computer Science"
        CTI = "CTI", "Computers and Information Technology"

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    program = models.CharField(max_length=50,choices=Program.choices)
    year = models.IntegerField(choices=Year.choices)
    group = models.CharField(max_length=30)

    def delete(self,using=None):
        if self.user:
            self.user.delete()
        super(Student, self).delete(using)
              

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # courses = models.ManyToManyField(Course)

    def __str__(self) -> str:
        return f"{self.user.first_name} {self.user.last_name}"

