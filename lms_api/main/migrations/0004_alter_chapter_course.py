# Generated by Django 5.0.4 on 2024-04-21 17:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_alter_chapter_course'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chapter',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='course_chapters', to='main.course'),
        ),
    ]
