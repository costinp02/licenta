from .serializers import CustomPayloadSerializer
from rest_framework_simplejwt.views import TokenViewBase

class CustomObtainTokenPair(TokenViewBase):
    serializer_class = CustomPayloadSerializer
    

# Create your views here.
