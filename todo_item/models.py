from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=64)
    link = models.URLField(blank=True)
    users = models.ManyToManyField(User)


class TODO(models.Model):
    text = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
