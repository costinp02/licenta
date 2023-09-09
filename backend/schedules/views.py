from rest_framework import generics
from rest_framework import permissions, authentication

from .serializers import ScheduleSerializer
from .models import Schedule

class ScheduleListCreateAPIView(generics.ListCreateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True

        return super(ScheduleListCreateAPIView, self).get_serializer(*args, **kwargs)

schedule_list_create_view  = ScheduleListCreateAPIView.as_view()
    

class ScheduleDetailAPIView(generics.RetrieveAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    lookup_field = 'pk'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

schedule_detail_view = ScheduleDetailAPIView.as_view()

class ScheduleUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    lookup_field = 'pk'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

schedule_update_view = ScheduleUpdateAPIView.as_view()


class SchedulePatchAPIView(generics.RetrieveUpdateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    lookup_field = 'pk'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

schedule_patch_view = SchedulePatchAPIView.as_view()


class ScheduleDestroyAPIView(generics.RetrieveDestroyAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    lookup_field = 'pk'
    permission_classes = [permissions.IsAdminUser]

schedule_destroy_view = ScheduleDestroyAPIView.as_view()

