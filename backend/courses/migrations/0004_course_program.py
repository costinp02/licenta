# Generated by Django 4.2.2 on 2023-08-30 12:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0003_course_teacher'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='program',
            field=models.CharField(choices=[('MATH', 'Mathematics'), ('APPLIEDMATH', 'Applied Mathematics'), ('CSMATH', 'Mathematics and Computer Science'), ('CS', 'Computer Science'), ('CTI', 'Computers and Information Technology'), ('DEFAULT', 'Default')], default='DEFAULT', max_length=45),
        ),
    ]
