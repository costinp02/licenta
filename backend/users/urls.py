from django.urls import path

from . import views

urlpatterns = [
    path('', views.user_list_create_view, name='user-list'),
    path('<int:pk>/', views.user_detail_view, name='user-detail'),
    path('<int:pk>/update/', views.user_update_view, name='user-update'),
    path('<int:pk>/patch/', views.user_patch_view, name='user-patch'),
    path('<int:pk>/delete/', views.user_destroy_view, name='user-delete'),
]