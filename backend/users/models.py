from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        STUDENT = "STUDENT", "Student"
        TEACHER = "TEACHER", "Teacher"

    base_role = Role.ADMIN

    username = models.EmailField(unique=True)
    role = models.CharField(max_length=50, choices=Role.choices, default=base_role)

    REQUIRED_FIELDS = ["first_name", "last_name"]

    

    # #using default on role won't work on student proxy so we override save
    # def save(self, *args, **kwargs):
    #     if not self.pk:
    #         self.role = self.base_role
    #         return super().save(*args, **kwargs)
        
        
# #Student.objects.all() returns all users so we use this to work with only students
# class StudentManager(BaseUserManager):
#     def get_queryset(self, *args, **kwargs):
#         results = super().get_queryset(*args, **kwargs)
#         return results.filter(role=User.Role.STUDENT)
    

# class Student(User):
#     base_role = User.Role.STUDENT

#     student = StudentManager()

#     class Meta:
#         proxy = True 


# #used to create student profile
# @receiver(post_save, sender=Student)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created and instance.role == "STUDENT":
#         StudentProfile.objects.create(user=instance)


# class StudentProfile(models.Model):
#     class Year(models.IntegerChoices):
#         YEAR1 = 1, "YEAR 1"
#         YEAR2 = 2, "YEAR 2"
#         YEAR3 = 3, "YEAR 3"
#         YEAR4 = 4, "YEAR 4"

#     class Program(models.TextChoices):
#         MATH = "MATH", "Mathematics"
#         APPLIED_MATH = "APPLIEDMATH", "Applied Mathematics"
#         CS_MATH = "CSMATH", "Mathematics and Computer Science"
#         CS = "CS", "Computer Science"
#         CTI = "CTI", "Computers and Information Technology"

#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     program = models.CharField(max_length=50,choices=Program.choices)
#     year = models.IntegerField(choices=Year.choices)
#     group = models.CharField(max_length=30)


