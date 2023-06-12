from django.urls import path

from . import views

urlpatterns = [
        path('', views.schedule_list_create_view, name='schedule-list'),
        path('<int:pk>/', views.schedule_detail_view, name='schedule-detail'),
        path('<int:pk>/update/', views.schedule_update_view, name='schedule-update'),
        path('<int:pk>/patch/', views.schedule_patch_view, name='schedule-patch'),
        path('<int:pk>/delete/', views.schedule_destroy_view, name='schedule-delete'),
]
