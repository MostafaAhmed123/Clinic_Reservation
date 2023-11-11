from .models import Doctor, Patient, Slot, Appointment
from rest_framework import serializers


from rest_framework import serializers
import hashlib


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = (
            "DoctorId",
            "DoctorName",
            "DoctorSpecialty",
            "DoctorUserName",
            "DoctorHashedPassword",
        )

    def create(self, validated_data):
        # Hash the password before saving it
        password = validated_data.get("DoctorHashedPassword")
        if password:
            validated_data["DoctorHashedPassword"] = self.sha256_hash(password)

        return super(DoctorSerializer, self).create(validated_data)

    @staticmethod
    def sha256_hash(password):
        encoded = password.encode("utf-8")
        sha256 = hashlib.sha256()
        sha256.update(encoded)
        return sha256.hexdigest()


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = (
            "PatientId",
            "PatientName",
            "PatientUserName",
            "PatientHashedPassword",
            "PatientMdedicalHistory",
        )
    def create(self, validated_data):
        # Hash the password before saving it
        password = validated_data.get("PatientHashedPassword")
        if password:
            validated_data["PatientHashedPassword"] = self.sha256_hash(password)

        return super(PatientSerializer, self).create(validated_data)

    @staticmethod
    def sha256_hash(password):
        encoded = password.encode("utf-8")
        sha256 = hashlib.sha256()
        sha256.update(encoded)
        return sha256.hexdigest()

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = (
            "SlotId",
            "Date",
            "Is_available",
            # "DoctorId",
            "doctorSlotFK",
            "StartTime",
            "EndTime",
        )

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ("AppointmentId", "AppointmentSlotNumber", "AppointmentPatientID")


class DoctorNameSpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('DoctorName', 'DoctorSpecialty', 'DoctorId')