from rest_framework import generics
from rest_framework import permissions, authentication

from .models import User, Student, StudentProfile
from .serializers import StudentSerializer

class StudentListAPIView(generics.ListAPIView):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentSerializer

    def perform_create(self, serializer):
        return super().perform_create(serializer)
    

student_list_view = StudentListAPIView.as_view()
