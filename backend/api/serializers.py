from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Link, Collection

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LinkSerializer(serializers.ModelSerializer):
    collection_title = serializers.CharField(source='collection.title', required=False)

    class Meta:
        model = Link
        fields = ["id", "title", "url", "description", "pinned", "date_created", "author", "collection", "collection_title"]
        extra_kwargs = {"author": {"read_only": True}}

class CollectionSerializer(serializers.ModelSerializer):
    links = LinkSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = ["id", "title", "description", "date_created", "author", "links"]
        extra_kwargs = {"author": {"read_only": True}}

class CollectionDetailSerializer(serializers.ModelSerializer):
    links = LinkSerializer(many=True)

    class Meta:
        model = Collection
        fields = ['id', 'title', 'description', 'links']  # Adding 'links' field        