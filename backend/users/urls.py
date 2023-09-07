from django.urls import path

from . import views

urlpatterns = [
    path('', views.user_list_create_view, name='user-list'),
    path('<int:pk>/', views.user_detail_view, name='user-detail'),
    path('<int:pk>/update/', views.user_update_view, name='user-update'),
    path('<int:pk>/patch/', views.user_patch_view, name='user-patch'),
    path('<int:pk>/delete/', views.user_destroy_view, name='user-delete'),
    path('students/', views.student_list_create_view, name='student-list'),
    path('students/<int:user_id>/', views.student_detail_view, name='student-detail'),
    path('students/<int:user_id>/update/', views.student_update_view, name='student-update'),
    path('students/<int:user_id>/patch/', views.student_patch_view, name='student-patch'),
    path('students/<int:user_id>/delete/', views.student_destroy_view, name='student-delete'),
    path('teachers/', views.teacher_list_create_view, name='teachers-list'),
    path('teachers/<int:pk>/', views.teacher_detail_view, name='teachers-detail'),
    path('teachers/<int:pk>/update/', views.teacher_update_view, name='teachers-update'),
    path('teachers/<int:pk>/patch/', views.teacher_patch_view, name='teachers-patch'),
    path('teachers/<int:pk>/delete/', views.teacher_destroy_view, name='teachers-delete'),
]