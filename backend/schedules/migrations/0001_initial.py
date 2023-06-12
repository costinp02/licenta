# Generated by Django 4.2.2 on 2023-06-12 19:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0013_alter_teacher_user'),
        ('courses', '0001_initial'),
        ('classrooms', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.CharField(blank=True, max_length=10)),
                ('classroom', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='classrooms.classroom')),
                ('course', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='courses.course')),
                ('teacher', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='users.teacher')),
            ],
        ),
    ]
