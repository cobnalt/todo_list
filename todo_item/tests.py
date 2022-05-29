from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, \
    APIClient, APITestCase
from mixer.backend.django import mixer
from users.models import User
from todo_item.views import ProjectModelViewSet
from todo_item.models import Project, TODO


class TestProjectModelViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_admin(self):
        project = mixer.blend(Project, name='Test Project')
        client = APIClient()
        admin = User.objects.create_superuser('admin1', 'admin@adm.com',
                                              'admin123456')
        client.login(username='admin1', password='admin123456')
        response = client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'Test Project')
        client.logout()


class TestTODOModelViewSet(APITestCase):

    def test_get_admin(self):
        todo = mixer.blend(TODO, text="Test Text Project")
        admin = User.objects.create_superuser('test_admin', 'tadmin@tadmin.com',
                                              '12345')
        self.client.login(username='test_admin', password='12345')
        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = TODO.objects.get(id=todo.id)
        self.assertEqual(todo.text, 'Test Text Project')
        self.client.logout()
