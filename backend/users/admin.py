from django.contrib import admin

from .models import User, Student, StudentProfile
# Register your models here.

admin.site.register(User)
admin.site.register(StudentProfile)
