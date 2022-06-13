from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin,\
    UpdateModelMixin
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerBase


# модель User: есть возможность просмотра списка и каждого пользователя в
# отдельности, можно вносить изменения, нельзя удалять и создавать;
class UserModelViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin,
                       GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '1.1':
            return UserModelSerializerBase
        return UserModelSerializer
