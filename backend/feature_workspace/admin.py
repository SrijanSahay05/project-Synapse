from django.contrib import admin
from feature_workspace.models import Workspace, Task
# Register your models here.

@admin.register(Workspace)
class WorkspaceAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'is_default', 'created_at', 'updated_at')
    list_filter = ('is_default', 'owner', 'created_at')
    search_fields = ('title', 'description', 'owner__email')
    ordering = ('-created_at',)

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'workspace', 'owner', 'priority', 'status', 'deadline', 'is_ai_generated', 'created_at')
    list_filter = ('status', 'priority', 'workspace', 'owner', 'is_ai_generated')
    search_fields = ('title', 'description', 'owner__email', 'original_input')
    ordering = ('-priority', '-created_at')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('owner', 'workspace', 'title', 'description')
        }),
        ('Status & Priority', {
            'fields': ('status', 'priority', 'deadline')
        }),
        ('AI Metadata', {
            'fields': ('is_ai_generated', 'original_input'),
            'classes': ('collapse',),
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )
