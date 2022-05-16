from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.status import HTTP_200_OK
from .models import Project, TODO
from .filters import ProjectFilter
from .serializers import ProjectModelSerializer, TODOModelSerializer


class TenResultPagination(PageNumberPagination):
    page_size = 10


class TwentyResultPagination(PageNumberPagination):
    page_size = 20


# модель Project: доступны все варианты запросов; для постраничного вывода
# установить размер страницы 10 записей; добавить фильтрацию по совпадению
# части названия проекта;
class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = TenResultPagination
    filterset_class = ProjectFilter


# модель ToDo: доступны все варианты запросов; при удалении не удалять ToDo, а
# выставлять признак, что оно закрыто; добавить фильтрацию по проекту; для
# постраничного вывода установить размер страницы 20
class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    pagination_class = TwentyResultPagination
    filterset_fields = ['project']

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_active = False
        todo.save()
        return Response(status=HTTP_200_OK)
