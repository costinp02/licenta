# Generated by Django 4.2.2 on 2023-08-19 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedules', '0003_alter_schedule_classroom_alter_schedule_teacher'),
    ]

    operations = [
        migrations.AddField(
            model_name='schedule',
            name='day_of_week',
            field=models.CharField(default=None, max_length=15),
            preserve_default=False,
        ),
    ]
