import graphene
from graphene_django import DjangoObjectType
from users.models import User
from todo_item.models import TODO, Project


class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude = ('is_superuser', 'is_staff', 'password')
        # fields = ('username', 'first_name', 'last_name', 'email')


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(TodoType)

    todo_by_id = graphene.Field(TodoType, id=graphene.Int(required=True))
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todos(root, info):
        return TODO.objects.all()

    def resolve_todo_by_id(root, info, id):
        try:
            return TODO.objects.get(pk=id)
        except TODO.DoesNotExist:
            return None

    def resolve_project_by_id(root, info, id):
        try:
            return Project.objects.get(pk=id)
        except Project.DoesNotExist:
            return None

    def resolve_user_by_id(root, info, id):
        try:
            return User.objects.get(pk=id)
        except User.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)
