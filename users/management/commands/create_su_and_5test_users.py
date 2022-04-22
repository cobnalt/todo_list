from django.core.management.base import BaseCommand, CommandError
from users.models import User


class Command(BaseCommand):
    help = 'Create superuser and 5 test users'

    def handle(self, *args, **options):
        User.objects.create_superuser(username='admin',
                                      email='admin@admin.com',
                                      password='123')
        for i in range(1, 6):
            try:
                User.objects.create_user(username=f'test_{i}',
                                         email=f'test{i}@test{i}.com',
                                         password='12345')
            except Exception:
                raise CommandError("Can't create User")
