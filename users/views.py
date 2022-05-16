from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin,\
    UpdateModelMixin
from .models import User
from .serializers import UserModelSerializer


# модель User: есть возможность просмотра списка и каждого пользователя в
# отдельности, можно вносить изменения, нельзя удалять и создавать;
class UserModelViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin,
                       GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
