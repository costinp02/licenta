# Generated by Django 4.2.2 on 2023-08-30 12:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='course_type',
            field=models.CharField(choices=[('LECTURE', 'Lecture'), ('SEMINAR', 'Seminar'), ('LABORATORY', 'Laboratory')], default='LECTURE', max_length=15),
        ),
    ]
