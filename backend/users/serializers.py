from rest_framework import serializers

from .models import User, Student, Teacher
from courses.serializers import CourseSerializer, CourseOnlyIDSerializer

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True, allow_blank=True)
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'password',
            'first_name',
            'last_name',
            'role'
        ]


    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password')
        print("HERE->" + password)
        if password != '':
            instance.set_password(password)
            print("password was changed")
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()
        print(instance.password)
        return instance
    
class UserEditSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True, allow_blank=True)
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'password',
            'first_name',
            'last_name',
            'role'
        ]
        extra_kwargs= {
            'username': {'read_only': True},
            'role': {'read_only': True},
        }

    def update(self, instance, validated_data):
        password = validated_data.pop('password')
        print("HERE->" + password)
        if password != '':
            instance.set_password(password)
            print("password was changed")
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()
        print(instance.password)
        return instance
    

'''
STUDENT SERIALIZERS
'''


class StudentRegisterSerializer(serializers.ModelSerializer):
    user=UserRegisterSerializer()
    class Meta:
        model = Student
        fields = [
            'user',
            'id',
            'program',
            'year',
            'group'
        ]

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        # print(user_data['role'])
        user_data['role'] = User.Role.STUDENT
        user = User.objects.create( **user_data)
        student = Student.objects.create(user=user, **validated_data)
        return student

class StudentEditSerializer(serializers.ModelSerializer):
    user=UserEditSerializer()
    class Meta:
        model = Student
        fields = [
            'user',
            'id',
            'program',
            'year',
            'group'
        ]
        extra_kwargs = {'user.username': {'read_only': True}}

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = instance.user
        print(instance.program)

        instance.program = validated_data.get('program', instance.program)
        instance.year = validated_data.get('year', instance.year)
        instance.group = validated_data.get('group', instance.group)
        instance.save()
        print(instance.program)
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.save()
        print(instance.program)
        return instance
    

'''
TEACHER SERIALIZERS
'''


class TeacherRegisterSerializer(serializers.ModelSerializer):
    user=UserRegisterSerializer()
    courses = CourseSerializer(many=True)
    class Meta:
        model = Teacher
        fields = [
            'id',
            'user',
            'courses'
        ]

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        print(user_data['role'])
        user_data['role'] = User.Role.TEACHER
        user = User.objects.create( **user_data)
        teacher = Teacher.objects.create(user=user, **validated_data)
        return teacher
    
class TeacherEditSerializer(serializers.ModelSerializer):
    user = UserEditSerializer()
    courses = CourseOnlyIDSerializer
    class Meta:
        model = Teacher
        fields = [
            'id',
            'user',
            'courses'
        ]
        extra_kwargs = {'user.username': {'read_only': True}}

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = instance.user
        # print(user_data['password'])
        instance.courses.set(validated_data.get('courses', instance.courses))

        # instance.program = validated_data.get('program', instance.program)
        # instance.year = validated_data.get('year', instance.year)
        # instance.group = validated_data.get('group', instance.group)
        instance.save()
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        if user_data['password'] != '':
            instance.user.set_password(user_data['password'])
            print("password was changed")
        user.save()
        # print(instance.user.password)

        return instance