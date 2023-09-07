from rest_framework import generics, response, status
from rest_framework import permissions, authentication

from .models import User, Student, Teacher
from .serializers import UserRegisterSerializer, UserEditSerializer, StudentRegisterSerializer, StudentEditSerializer, TeacherRegisterSerializer, TeacherEditSerializer

class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    # authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

user_list_create_view  = UserListCreateAPIView.as_view()
    

class UserDetailAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    lookup_field = 'pk'
    # authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

user_detail_view = UserDetailAPIView.as_view()

class UserUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserEditSerializer
    lookup_field = 'pk'
    # authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

user_update_view = UserUpdateAPIView.as_view()


class UserPatchAPIView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserEditSerializer
    lookup_field = 'pk'
    # authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

user_patch_view = UserPatchAPIView.as_view()


class UserDestroyAPIView(generics.RetrieveDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    lookup_field = 'pk'
    # authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAdminUser]

user_destroy_view = UserDestroyAPIView.as_view()



'''
STUDENT VIEWS
'''

class StudentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentRegisterSerializer
    # authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]


student_list_create_view = StudentListCreateAPIView.as_view()

class StudentDetailAPIView(generics.RetrieveAPIView):
    serializer_class = StudentRegisterSerializer
    lookup_field = 'user__id'
    lookup_url_kwarg = 'user_id'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Student.objects.filter(user__id=self.kwargs['user_id'])

student_detail_view = StudentDetailAPIView.as_view()

class StudentUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = StudentEditSerializer
    lookup_field = 'user__id'
    lookup_url_kwarg = 'user_id'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Student.objects.filter(user__id=self.kwargs['user_id'])

student_update_view = StudentUpdateAPIView.as_view()


class StudentPatchAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = StudentEditSerializer
    lookup_field = 'user__id'
    lookup_url_kwarg = 'user_id'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Student.objects.filter(user__id=self.kwargs['user_id'])

student_patch_view = StudentPatchAPIView.as_view()


class StudentDestroyAPIView(generics.RetrieveDestroyAPIView):
    serializer_class = StudentRegisterSerializer
    lookup_field = 'user__id'
    lookup_url_kwarg = 'user_id'
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return Student.objects.filter(user__id=self.kwargs['user_id'])

student_destroy_view = StudentDestroyAPIView.as_view()


'''
TEACHER VIEWS
'''

class TeacherListCreateAPIView(generics.ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherRegisterSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
 
teacher_list_create_view = TeacherListCreateAPIView.as_view()


class TeacherDetailAPIView(generics.RetrieveAPIView):
    serializer_class = TeacherRegisterSerializer
    lookup_field = 'user__id'
    lookup_url_kwarg = 'user_id'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Teacher.objects.filter(user__id=self.kwargs['user_id'])

teacher_detail_view = TeacherDetailAPIView.as_view()


class TeacherUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = TeacherEditSerializer
    lookup_field = 'user__id'
    lookup_url_kwarg = 'user_id'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Teacher.objects.filter(user__id=self.kwargs['user_id'])

teacher_update_view = TeacherUpdateAPIView.as_view()


class TeacherPatchAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = TeacherEditSerializer
    lookup_field = 'user__id'
    lookup_url_kwarg = 'user_id'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Teacher.objects.filter(user__id=self.kwargs['user_id'])

teacher_patch_view = TeacherPatchAPIView.as_view()


class TeacherDestroyAPIView(generics.RetrieveDestroyAPIView):
    serializer_class = TeacherRegisterSerializer
    lookup_field = 'user__id'
    lookup_url_kwarg = 'user_id'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Teacher.objects.filter(user__id=self.kwargs['user_id'])

teacher_destroy_view = TeacherDestroyAPIView.as_view()


