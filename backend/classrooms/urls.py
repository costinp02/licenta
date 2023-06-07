from django.urls import path

from . import views

urlpatterns = [
    path('', views.classroom_list_create_view, name='classroom-list'),
    path('<int:pk>/', views.classroom_detail_view, name='classroom-detail'),
    path('<int:pk>/update/', views.classroom_update_view, name='classroom-update'),
    path('<int:pk>/patch/', views.classroom_patch_view, name='classroom-patch'),
    path('<int:pk>/delete/', views.classroom_destroy_view, name='classroom-delete'),
]