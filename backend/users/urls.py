from django.urls import path

from . import views

urlpatterns = [
    path('', views.student_list_view, name='student-list'),
]