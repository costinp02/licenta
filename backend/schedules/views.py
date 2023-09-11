from rest_framework import generics
from rest_framework import permissions, authentication
from rest_framework.response import Response
from rest_framework import status

from .serializers import ScheduleCreateSerializer, ScheduleViewSerializer
from .models import Schedule

class ScheduleListCreateAPIView(generics.ListCreateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleCreateSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True

        return super(ScheduleListCreateAPIView, self).get_serializer(*args, **kwargs)

schedule_list_create_view  = ScheduleListCreateAPIView.as_view()

class ScheduleListAPIView(generics.ListAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleViewSerializer

schedule_list_view = ScheduleListAPIView.as_view() 
    

class ScheduleDetailAPIView(generics.RetrieveAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleCreateSerializer
    lookup_field = 'pk'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

schedule_detail_view = ScheduleDetailAPIView.as_view()

class ScheduleUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleCreateSerializer
    lookup_field = 'pk'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

schedule_update_view = ScheduleUpdateAPIView.as_view()


class SchedulePatchAPIView(generics.RetrieveUpdateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleCreateSerializer
    lookup_field = 'pk'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

schedule_patch_view = SchedulePatchAPIView.as_view()


class ScheduleDestroyAPIView(generics.RetrieveDestroyAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleCreateSerializer
    lookup_field = 'pk'
    permission_classes = [permissions.IsAdminUser]

schedule_destroy_view = ScheduleDestroyAPIView.as_view()

class ScheduleReset(generics.DestroyAPIView):
    def delete(self, request):
        Schedule.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def get_queryset(self):
        return Schedule.objects.all()
    
schedule_reset_view = ScheduleReset.as_view()

