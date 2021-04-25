from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    message = 'You are not the owner'

    def has_object_permission(self, request, view, obj):
        return obj.author == request.user.profile

class IsAdmin(permissions.BasePermission):
    message = 'You are not administrator'
    
    def has_permission(self, request, view):
        return request.user and request.user.is_admin