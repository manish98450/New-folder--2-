# Generated by Django 5.0.4 on 2024-04-22 12:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_teacher_detail_alter_course_teacher'),
    ]

    operations = [
        migrations.RenameField(
            model_name='student',
            old_name='qualification',
            new_name='username',
        ),
    ]
