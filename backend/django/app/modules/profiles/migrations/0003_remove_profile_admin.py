# Generated by Django 3.0.2 on 2021-04-24 14:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0002_profile_admin'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='admin',
        ),
    ]