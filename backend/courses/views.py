from rest_framework import generics

from .models import Course
from .serializers import CourseSerializer

class CourseListCreateAPIView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

course_list_create_view  = CourseListCreateAPIView.as_view()
    

class CourseDetailAPIView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = 'pk'

course_detail_view = CourseDetailAPIView.as_view()


class CourseUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = 'pk'

course_update_view = CourseUpdateAPIView.as_view()


class CoursePatchAPIView(generics.RetrieveUpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = 'pk'

course_patch_view = CoursePatchAPIView.as_view()


class CourseDestroyAPIView(generics.RetrieveDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = 'pk'

course_destroy_view = CourseDestroyAPIView.as_view()