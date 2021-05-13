from rest_framework import serializers
from .models import Department


class DeptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = (
            'id',
            'title',
        )
