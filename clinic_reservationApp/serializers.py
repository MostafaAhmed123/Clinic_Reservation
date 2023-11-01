from .models import *
from rest_framework import serializers
class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields=('DoctorId', 'DoctorName', 'DoctorSpecialty', 'DoctorUserName', 'DoctorHashedPassword')        



class PatientSerializer(serializers.ModelSerializer) :
      class Meta:
           model=Patient
           fields=('PatientId','PatientName','PatientUserName','PatientHashedPassword','PatientMdedicalHistory') 

class SlotSerializer(serializers.ModelSerializer) :
      class Meta:
           model=Slot
           fields=('SlotId','Date','Is_available','DoctorId','doctorSlotFK','StartTime','StartTime','EndTime') 
           

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ('AppointmentId', 'AppointmentSlotNumber', 'AppointmentPatientID')


        