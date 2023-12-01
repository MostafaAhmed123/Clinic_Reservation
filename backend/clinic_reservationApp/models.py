from django.db import models

class Doctor(models.Model):
    DoctorId=models.AutoField(primary_key=True)
    DoctorName=models.CharField(max_length=50)
    DoctorSpecialty=models.CharField(max_length=50)
    DoctorUserName= models.CharField(max_length=50)
    DoctorHashedPassword=models.CharField(max_length=255)


class Patient(models.Model):
    PatientId=models.AutoField(primary_key=True)
    PatientName=models.CharField(max_length=50)
    PatientUserName= models.CharField(max_length=50)
    PatientHashedPassword=models.CharField(max_length=255)
    PatientMdedicalHistory=models.CharField(max_length=255)

class Slot(models.Model):
    SlotId = models.AutoField(primary_key = True)
    Date = models.DateField()
    Is_available = models.BooleanField()
    # DoctorId = models.IntegerField()
    doctorSlotFK = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    StartTime = models.TimeField()
    EndTime = models.TimeField()
    

class Appointment(models.Model):
    AppointmentId=models.AutoField(primary_key=True)
    AppointmentSlotNumber=models.ForeignKey(Slot,on_delete=models.CASCADE)
    AppointmentPatientID=models.ForeignKey(Patient,on_delete=models.CASCADE)

    






 