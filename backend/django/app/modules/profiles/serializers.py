from rest_framework import serializers

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    admin  = serializers.BooleanField(source='user.is_admin')
    # last_seen = serializers.SerializerMethodField(source='user.last_seen')
    online = serializers.BooleanField(source='user.online')
    last_seen = serializers.CharField(source='user.get_last_seen')
    
    bio = serializers.CharField(allow_blank=True, required=False)
    image = serializers.CharField(allow_blank=True, required=False) #para que funcione el UPDATE de la imagen
    # image = serializers.SerializerMethodField()
    # admin = serializers.BooleanField(required=False)
    following = serializers.SerializerMethodField()
    followersCount = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ('username', 'bio', 'image', 'following','followersCount','admin','online','last_seen',)
        read_only_fields = ('username',)

    def get_image(self, obj):
        print("GET IMAGE ")
        if obj.image:
            return obj.image

        return 'https://static.productionready.io/images/smiley-cyrus.jpg'
        # return obj.image

    def get_following(self, instance):
        request = self.context.get('request', None)

        if request is None:
            return False

        # if not request.user.is_authenticated():
        if not request.user.is_authenticated:
            return False

        follower = request.user.profile
        followee = instance

        return follower.is_following(followee)

    def get_followersCount(self, instance):
        request = self.context.get('request', None)
        followee = instance
        res = [item for item in Profile.objects.all() if followee.is_followed_by(item)]

        # me = request.user.profile
        # if me.is_followed_by(followee):
        #     res.append(followee)

        return len(res)


class ProfilesSerializer(serializers.ModelSerializer):
    users = ProfileSerializer(many=True)

    class Meta:
        model = Profile
        fields = ('__all__')
