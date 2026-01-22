from rest_framework import serializers
from feature_workspace.models import Workspace, Task

class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ['id', 'title', 'description', 'ai_rules', 'is_default', 'created_at', 'updated_at']
        read_only_fields = ['owner', 'is_default', 'created_at', 'updated_at']

class TaskSerializer(serializers.ModelSerializer):
    workspace = serializers.PrimaryKeyRelatedField(
        queryset=Workspace.objects.all(),
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Task
        fields = [
            'id', 'owner', 'title', 'description',
            'priority', 'status', 'deadline',
            'workspace', 'is_ai_generated', 
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'owner', 'is_ai_generated', 'created_at', 'updated_at'
        ]
    def __init__(self, *args, **kwargs):
        """Limit the dropdown menu to only show MY workspace"""
        super().__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            self.fields['workspace'].queryset = Workspace.objects.filter(owner=request.user)

    def validate_workspace(self, value):
        """Check that the workspace belongs to the owner"""
        user = self.context['request'].user

        if value is None:
            return value

        if value.owner != user:
            raise serializers.ValidationError('You do not have permission to assign this workspace to this task.')

        return value

    def to_representation(self, instance):
        """Return the full workspace title, not just the ID"""
        rep = super().to_representation(instance)
        if instance.workspace:
            rep['workspace'] = {
                "id" : instance.workspace.id, 
                "title" : instance.workspace.title
            }
        return rep
