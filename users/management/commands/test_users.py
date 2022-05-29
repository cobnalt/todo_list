from django.core.management.base import BaseCommand, CommandError
from mimesis import Person
from mimesis.locales import Locale
from mimesis.enums import Gender
from users.models import User


class Command(BaseCommand):
    help = 'Create superuser and 5 test users'

    def make_person(self, password=None):
        person = Person(Locale.EN)
        return (
            person.username(mask='l_l_d', drange=(1000, 5000)),
            person.email(unique=True),
            password if password else person.password(),
            person.first_name(gender=Gender.MALE),
            person.last_name(gender=Gender.MALE),
        )

    def handle(self, *args, **options):
        username, email, password, first_name, last_name = self.make_person(password='123')
        User.objects.create_superuser(
            username=username, email=email, password=password,
            first_name=first_name, last_name=last_name)
        for _ in range(1, 6):
            username, email, password, first_name, last_name = self.make_person(password='12345')
            try:
                User.objects.create_user(
                    username=username, email=email, password=password,
                    first_name=first_name, last_name=last_name)
            except Exception:
                raise CommandError("Can't create User")
