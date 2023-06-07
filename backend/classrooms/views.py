from rest_framework import generics

from .models import Classroom
from .serializers import ClassroomSerializer

class ClassroomListCreateAPIView(generics.ListCreateAPIView):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer

classroom_list_create_view  = ClassroomListCreateAPIView.as_view()
    

class ClassroomDetailAPIView(generics.RetrieveAPIView):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer
    lookup_field = 'pk'

classroom_detail_view = ClassroomDetailAPIView.as_view()


class ClassroomUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer
    lookup_field = 'pk'

classroom_update_view = ClassroomUpdateAPIView.as_view()


class ClassroomPatchAPIView(generics.RetrieveUpdateAPIView):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer
    lookup_field = 'pk'

classroom_patch_view = ClassroomPatchAPIView.as_view()


class ClassroomDestroyAPIView(generics.RetrieveDestroyAPIView):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer
    lookup_field = 'pk'

classroom_destroy_view = ClassroomDestroyAPIView.as_view()
