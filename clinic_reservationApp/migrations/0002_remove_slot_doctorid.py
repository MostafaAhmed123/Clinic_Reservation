# Generated by Django 4.2.6 on 2023-11-03 22:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clinic_reservationApp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='slot',
            name='DoctorId',
        ),
    ]
