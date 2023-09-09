from .serializers import CustomPayloadSerializer
from rest_framework_simplejwt.views import TokenViewBase
from rest_framework import permissions

class CustomObtainTokenPair(TokenViewBase):
    serializer_class = CustomPayloadSerializer
    permission_classes = [permissions.AllowAny]

# Create your views here.
