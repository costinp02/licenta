# Generated by Django 4.2.2 on 2023-06-08 13:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_user_username_alter_user_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('program', models.CharField(choices=[('MATH', 'Mathematics'), ('APPLIEDMATH', 'Applied Mathematics'), ('CSMATH', 'Mathematics and Computer Science'), ('CS', 'Computer Science'), ('CTI', 'Computers and Information Technology')], max_length=50)),
                ('year', models.IntegerField(choices=[(1, 'YEAR 1'), (2, 'YEAR 2'), (3, 'YEAR 3'), (4, 'YEAR 4')])),
                ('group', models.CharField(max_length=30)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]