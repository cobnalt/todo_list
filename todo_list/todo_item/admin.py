from django.contrib import admin
from .models import Project, TODO


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    pass


@admin.register(TODO)
class TODOAdmin(admin.ModelAdmin):
    pass
