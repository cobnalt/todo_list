from rest_framework.serializers import ModelSerializer
from .models import Project, TODO
from users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    users = UserModelSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        proj = Project.objects.create(**validated_data)
        return proj


class TODOModelSerializer(ModelSerializer):
    user = UserModelSerializer()
    project = ProjectModelSerializer()


    class Meta:
        model = TODO
        fields = '__all__'
