# Generated by Django 5.0.6 on 2024-06-26 20:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0005_rename_id_usuario_usuario_rut'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='RUT',
            field=models.CharField(max_length=10, primary_key=True, serialize=False),
        ),
    ]