from rest_framework.serializers import ModelSerializer
from .models import Project, TODO
from users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TODOModelSerializer(ModelSerializer):
    user = UserModelSerializer()
    project = ProjectModelSerializer()

    class Meta:
        model = TODO
        fields = '__all__'
