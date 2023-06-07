from django.urls import path

from . import views

urlpatterns = [
    path('', views.course_list_create_view, name='course-list'),
    path('<int:pk>/', views.course_detail_view, name='course-detail'),
    path('<int:pk>/update/', views.course_update_view, name='course-update'),
    path('<int:pk>/patch/', views.course_patch_view, name='course-patch'),
    path('<int:pk>/delete/', views.course_destroy_view, name='course-delete'),
]