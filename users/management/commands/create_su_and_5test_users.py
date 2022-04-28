from django.core.management.base import BaseCommand, CommandError
from mimesis import Person
from mimesis.locales import Locale
from mimesis.enums import Gender
from users.models import User


class Command(BaseCommand):
    help = 'Create superuser and 5 test users'

    def handle(self, *args, **options):
        person = Person(Locale.EN)

        User.objects.create_superuser(username=person.username(
            mask='l_l_d', drange=(1000, 5000)),
            email=person.email(unique=True),
            password=person.password(),
            first_name=person.first_name(gender=Gender.MALE),
            last_name=person.last_name(gender=Gender.MALE)
        )
        for _ in range(1, 3):
            try:
                User.objects.create_user(username=person.username(
                    mask='l_l_d', drange=(1000, 5000)),
                    email=person.email(unique=True),
                    password=person.password(),
                    first_name=person.first_name(gender=Gender.MALE),
                    last_name=person.last_name(gender=Gender.MALE))
            except Exception:
                raise CommandError("Can't create User")

        for _ in range(1, 4):
            try:
                User.objects.create_user(username=person.username(
                    mask='l_l_d', drange=(1000, 5000)),
                    email=person.email(unique=True),
                    password=person.password(),
                    first_name=person.first_name(gender=Gender.FEMALE),
                    last_name=person.last_name(gender=Gender.FEMALE))
            except Exception:
                raise CommandError("Can't create User")
