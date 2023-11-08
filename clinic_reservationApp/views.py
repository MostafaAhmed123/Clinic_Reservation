from pymysql import NULL
from .models import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from .serializers import *
import hashlib
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.decorators import api_view, renderer_classes
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


# Create your views here.
@csrf_exempt
@api_view(("POST",))
def login(request):
    if request.method == "POST":
        user = JSONParser().parse(request)
        username = user.get("username")
        password = user.get("password")
        
        hashedPassword = sha256_hash(password)
        doctors = listDoctors()
        for doctor in doctors:
            if (
                doctor.DoctorUserName == username
                and doctor.DoctorHashedPassword == hashedPassword
            ):
                return JsonResponse({"status": True})
        patients = Patient.objects.all()
        for patient in patients:
            if (
                patient.PatientUserName == username
                and patient.PatientHashedPassword == hashedPassword
            ):
                return JsonResponse({"status": True},status=status.HTTP_200_OK)
        print(username)
        return Response(
            "User not registered, sign up and try again" ,
            status=status.HTTP_400_BAD_REQUEST,
        )
    return Response("Invalid HTTP method", status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt
@api_view(("POST",))
def AddDoctor(request):
    if request.method == "POST":
        doc = JSONParser().parse(request)
        serializer = DoctorSerializer(data=doc)
        if serializer.is_valid():
            # Check if the username is unique
            doctor_username = serializer.validated_data.get("DoctorUserName")
            if Doctor.objects.filter(DoctorUserName=doctor_username).exists():
                return Response(
                    "Username already exists. Please choose a different one.",
                    status=status.HTTP_400_BAD_REQUEST,
                )
            # Save the new Doctor instance
            serializer.save()
            return Response("Doctor added successfully", status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response("Invalid HTTP method", status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt
@api_view(("POST",))
def AddPatient(request):
    if request.method == "POST":
        patient_data = JSONParser().parse(request)
        serializer = PatientSerializer(data=patient_data)

        if serializer.is_valid():
            # Check if the username is unique
            patient_username = serializer.validated_data.get("PatientUserName")
            if Patient.objects.filter(PatientUserName=patient_username).exists():
                return Response(
                    "Username already exists. Please choose a different one.",
                    status=status.HTTP_400_BAD_REQUEST,
                )
            # Save the new Patient instance
            serializer.save()
            return Response("Patient added successfully", status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response("Invalid HTTP method", status=status.HTTP_405_METHOD_NOT_ALLOWED)


@csrf_exempt
@api_view(("POST",))
def create_slot(request):
    if request.method == "POST":
        slot_data = JSONParser().parse(request)
        serializer = SlotSerializer(data=slot_data)
        doctor_id = slot_data.get("doctorSlotFK")  # Access doctor ID directly from JSON data

        if serializer.is_valid():
            # Check if the doctor exists
            if not Doctor.objects.filter(DoctorId=doctor_id).exists():
                return Response("Doctor not found", status=status.HTTP_400_BAD_REQUEST)
            # Check for existing slots with the same start and end times on the same day for the same doctor
            date = slot_data.get("Date")
            start_time = slot_data.get("StartTime")
            end_time = slot_data.get("EndTime")
            existing_slots = Slot.objects.filter(
                doctorSlotFK=doctor_id, Date=date, StartTime=start_time, EndTime=end_time
            )
            if existing_slots.exists():
                return Response(
                    "A slot with the same start and end times on the same day already exists for this doctor",
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Save the new slot instance
            serializer.save()
            return Response("Slot added successfully", status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response("Invalid HTTP method", status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt
@api_view(['GET'])
def list_doctor_names_specialties(request):
    doctors = Doctor.objects.all()
    serializer = DoctorNameSpecialtySerializer(doctors, many=True)
    return Response(serializer.data)


@csrf_exempt
@api_view(['GET'])
def view_available_slots(request):
    doctor_name = request.query_params.get('doctor_name')
    doctor_speciality = request.query_params.get('doctor_speciality')
    try:
        doctor = Doctor.objects.get(DoctorName=doctor_name, DoctorSpecialty=doctor_speciality)
        available_slots = Slot.objects.filter(doctorSlotFK=doctor, Is_available=1)

        if available_slots.exists():
            serializer = SlotSerializer(available_slots, many=True)
            return Response(serializer.data)
        else:
            return Response("No available slots for this doctor", status=status.HTTP_200_OK)
    except Doctor.DoesNotExist:
        return Response("Doctor not found", status=status.HTTP_404_NOT_FOUND)
        
    
@csrf_exempt
@api_view(['POST'])
def choose_slot(request):
    parser = JSONParser().parse(request)
    patient_username = parser.get('patient_username')
    doctor_name = parser.get('doctor_name')
    doctor_speciality = parser.get('doctor_speciality')
    date = parser.get('date')
    startTime = parser.get('StartTime')
    endTime = parser.get('EndTime')

    try:
        patient = Patient.objects.get(PatientUserName=patient_username)
        doctor = Doctor.objects.get(DoctorName=doctor_name, DoctorSpecialty=doctor_speciality)
        slot = Slot.objects.get(
            doctorSlotFK=doctor,
            Date=date,
            StartTime=startTime,
            EndTime=endTime,
            Is_available=True
        )

        # Create a new appointment for the patient with the chosen slot
        appointment_data = {
            "AppointmentSlotNumber": slot.SlotId,
            "AppointmentPatientID": patient.PatientId
        }

        appointment_serializer = AppointmentSerializer(data=appointment_data)
        if appointment_serializer.is_valid():
            appointment_serializer.save()
            # Mark the slot as unavailable
            slot.Is_available = False
            slot.save()
            return Response("Slot chosen successfully", status=status.HTTP_201_CREATED)
        else:
            return Response(appointment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Patient.DoesNotExist:
        return Response("Patient not found", status=status.HTTP_404_NOT_FOUND)
    except Doctor.DoesNotExist:
        return Response("Doctor not found", status=status.HTTP_404_NOT_FOUND)
    except Slot.DoesNotExist:
        return Response("Slot not found or not available", status=status.HTTP_400_BAD_REQUEST)
    

@csrf_exempt
@api_view(['DELETE'])
def cancel_appointment(request):
    parser = JSONParser().parse(request)
    patientUsername = parser.get('patientUsername')
    appointmentId = parser.get('appointmentId')  # Fixed the typo in the variable name

    try:
        patient = Patient.objects.get(PatientUserName=patientUsername)
        appointment = Appointment.objects.get(AppointmentId=appointmentId, AppointmentPatientID=patient)
        slot = appointment.AppointmentSlotNumber  # Retrieve the Slot object

        # Check if the slot is available (this may depend on your model structure)
        if slot.Is_available:
            return Response("Slot is already available", status=status.HTTP_400_BAD_REQUEST)
        # Set the slot as available
        slot.Is_available = True
        slot.save()
        # Delete the appointment
        appointment.delete()
        return Response("Appointment canceled successfully")
    except Appointment.DoesNotExist:
        return Response("Appointment Not Found", status=status.HTTP_400_BAD_REQUEST)
    except Patient.DoesNotExist:
        return Response("Patient not found", status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
@api_view(['PUT'])
def editAppointment(request):
    parser = JSONParser().parse(request)
    appointmentID = parser.get('appointment_id')
    appointment = Appointment.objects.get(AppointmentId = appointmentID)
    slot = appointment.AppointmentSlotNumber
    # slot = Slot.objects.get(SlotId = slotNo)
    slot.Is_available = True
    slot.save()
    slot2 = Slot.objects.get(SlotId = parser.get('slot_id'))
    appointment.AppointmentSlotNumber = slot2
    slot2.Is_available = False
    slot2.save()
    appointment.save()
    return Response("Appointment edited successfully")

@csrf_exempt
@api_view(['GET'])
def listPatientReservation(request):
    patient_id = request.query_params.get('id')
    appointments = Appointment.objects.filter(AppointmentPatientID=patient_id)
    appointment_serializer = AppointmentSerializer(appointments, many=True)
    return Response(appointment_serializer.data)

def listDoctors():
    doc = Doctor.objects.all()
    return doc


def sha256_hash(password):
    encoded = password.encode("utf-8")
    sha256 = hashlib.sha256()
    sha256.update(encoded)
    return sha256.hexdigest()