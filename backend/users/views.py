from rest_framework import generics
from rest_framework import permissions, authentication

from .models import User 
from .serializers import UserSerializer

class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

user_list_create_view  = UserListCreateAPIView.as_view()
    

class UserDetailAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

user_detail_view = UserDetailAPIView.as_view()

class UserUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

user_update_view = UserUpdateAPIView.as_view()


class UserPatchAPIView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

user_patch_view = UserPatchAPIView.as_view()


class UserDestroyAPIView(generics.RetrieveDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

user_destroy_view = UserDestroyAPIView.as_view()

# class StudentListAPIView(generics.ListAPIView):
#     queryset = StudentProfile.objects.all()
#     serializer_class = StudentSerializer

#     def perform_create(self, serializer):
#         return super().perform_create(serializer)
    

# student_list_view = StudentListAPIView.as_view()
