from datetime import date
import datetime
import json
from pyexpat.errors import messages
from pymysql import NULL
from .models import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from .serializers import *
import hashlib
# from .kafka_producer import KafkaProducer
# from .kafka_consumer import KafkaConsumer
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.decorators import api_view, renderer_classes
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from datetime import datetime



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
                return JsonResponse(
                    {"Type": "Doctor", "ID": doctor.DoctorId, "Username": doctor.DoctorUserName}, status=status.HTTP_200_OK
                )
        patients = Patient.objects.all()
        for patient in patients:
            if (
                patient.PatientUserName == username
                and patient.PatientHashedPassword == hashedPassword
            ):
                return JsonResponse(
                    {"Type": "Patient", "ID": patient.PatientId, "Username": patient.PatientUserName},
                    status=status.HTTP_200_OK,
                )
        return Response(
            "User not registered, sign up and try again",
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
            if Patient.objects.filter(PatientUserName=doctor_username).exists():
                return Response(
                    "Username already exists. Please choose a different one.",
                    status=status.HTTP_400_BAD_REQUEST,
                )
            # Save the new Doctor instance
            serializer.save()

            # Retrieve the ID and username of the newly added doctor
            new_doctor = Doctor.objects.get(DoctorUserName=doctor_username)
            response_data = {
                "id": new_doctor.DoctorId,
                "username": new_doctor.DoctorUserName,
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
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
            if Doctor.objects.filter(DoctorUserName=patient_username).exists():
                return Response(
                    "Username already exists. Please choose a different one.",
                    status=status.HTTP_400_BAD_REQUEST,
                )
            # Save the new Patient instance
            serializer.save()

            # Retrieve the ID and username of the newly added patient
            new_patient = Patient.objects.get(PatientUserName=patient_username)
            response_data = {
                "id": new_patient.PatientId,
                "username": new_patient.PatientUserName,
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response("Invalid HTTP method", status=status.HTTP_405_METHOD_NOT_ALLOWED)



@csrf_exempt
@api_view(["GET"])
def getUser(request):
    user = JSONParser().parse(request)
    userType = user.get("Type")
    userID = user.get("ID")
    if userType == "Doctor":
        try:
            doctor = Doctor.objects.get(DoctorId=userID)
            data = DoctorSerializer(data=doctor).data
            return JsonResponse(data, status=status.HTTP_200_OK)
        except:
            return JsonResponse(
                {"error": "No such User"}, status=status.HTTP_404_NOT_FOUND
            )
    elif userType == "Patient":
        try:
            patient = Patient.objects.get(PatientId=userID)
            data = PatientSerializer(data=patient).data
            return JsonResponse(data, status=status.HTTP_200_OK)
        except:
            return JsonResponse(
                {"error": "No such User"}, status=status.HTTP_404_NOT_FOUND
            )
    else:
        return JsonResponse(
            {"error": "Invalid Type"}, status=status.HTTP_400_BAD_REQUEST
        )


@csrf_exempt
@api_view(("POST",))
def create_slot(request):
    if request.method == "POST":
        slot_data = JSONParser().parse(request)
        serializer = SlotSerializer(data=slot_data)
        doctor_id = slot_data.get(
            "doctorSlotFK"
        )  # Access doctor ID directly from JSON data

        if serializer.is_valid():
            # Check if the doctor exists
            if not Doctor.objects.filter(DoctorId=doctor_id).exists():
                return Response("Doctor not found", status=status.HTTP_400_BAD_REQUEST)
            # Check for existing slots with the same start and end times on the same day for the same doctor
            date = slot_data.get("Date")
            start_time = slot_data.get("StartTime")
            end_time = slot_data.get("EndTime")
            existing_slots = Slot.objects.filter(
                doctorSlotFK=doctor_id,
                Date=date,
                StartTime=start_time,
                EndTime=end_time,
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
@api_view(["GET"])
def list_doctor_names_specialties(request):
    doctors = Doctor.objects.all()
    serializer = DoctorNameSpecialtySerializer(doctors, many=True)
    return Response(serializer.data)


@csrf_exempt
@api_view(["GET"])
def view_available_slots(request):
    doctor_id = request.query_params.get("doctorId")  # Change parameter to doctor_id
    try:
        doctor = Doctor.objects.get(DoctorId=doctor_id)  # Use id to retrieve doctor
        available_slots = Slot.objects.filter(doctorSlotFK=doctor, Is_available=1)

        if available_slots.exists():
            serializer = SlotSerializer(available_slots, many=True)
            return Response(serializer.data)
        else:
            return Response(
                "No available slots for this doctor", status=status.HTTP_200_OK
            )
    except Doctor.DoesNotExist:
        return Response("Doctor not found", status=status.HTTP_404_NOT_FOUND)



def is_done(slot):
    if slot.Date > date.today():
        return False
    elif slot.Date < date.today():
        return True
    elif slot.StartTime < datetime.now():
        return True
    else:
        return False


@csrf_exempt
@api_view(["DELETE"])
def deleteSlot(request):
    id = request.query_params.get("id")
    try:
        slot = Slot.objects.get(SlotId=id)
        if is_done(slot):
            return Response(
                "Cannot cancel a past or ongoing appointment",
                status=status.HTTP_403_FORBIDDEN,
            )
        appiontments = Appointment.objects.filter(AppointmentSlotNumber=id)
        if len(appiontments) > 0:
            return Response(
                "Cannot cancel occupied slot", status=status.HTTP_403_FORBIDDEN
            )
        slot.delete()
        return Response("Successfully deleted slot", status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_304_NOT_MODIFIED)


# Update the 'choose_slot' view to return the updated slot information

@csrf_exempt
@api_view(["POST"])
def choose_slot(request):
    parser = JSONParser().parse(request)
    patient_username = parser.get("patient_username")
    slot_id = parser.get("slot_id")  # Change to slot_id

    try:
        print(patient_username)
        patient = Patient.objects.get(PatientUserName=patient_username)
        # Get the slot based on the provided slot_id
        slot = Slot.objects.get(SlotId=slot_id, Is_available=True)

        # Create a new appointment for the patient with the chosen slot
        appointment_data = {
            "AppointmentSlotNumber": slot.SlotId,
            "AppointmentPatientID": patient.PatientId,
        }

        appointment_serializer = AppointmentSerializer(data=appointment_data)
        if appointment_serializer.is_valid():
            appointment_serializer.save()
            # Mark the slot as unavailable
            slot.Is_available = False
            slot.save()
            # Return the updated slot information
            serializer = SlotSerializer(slot)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                appointment_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
    except Patient.DoesNotExist:
        return Response("Patient not found", status=status.HTTP_404_NOT_FOUND)
    except Slot.DoesNotExist:
        return Response(
            "Slot not found or not available", status=status.HTTP_400_BAD_REQUEST
        )



@csrf_exempt
@api_view(["DELETE"])
def cancel_appointment(request):
    parser = JSONParser().parse(request)
    patientUsername = parser.get("patientUsername")
    appointmentId = parser.get("appointmentId")  # Fixed the typo in the variable name

    try:
        patient = Patient.objects.get(PatientUserName=patientUsername)
        appointment = Appointment.objects.get(
            AppointmentId=appointmentId, AppointmentPatientID=patient
        )
        slot = appointment.AppointmentSlotNumber  # Retrieve the Slot object

        # Check if the slot is available (this may depend on your model structure)
        if slot.Is_available:
            return Response(
                "Slot is already available", status=status.HTTP_400_BAD_REQUEST
            )
        # Set the slot as available
        slot.Is_available = True
        slot.save()
        # Delete the appointment
        appointment.delete()
        #kafka_producer = KafkaProducer(settings.KAFKA_CONFIG["bootstrap_servers"])
        message = {
            "doctorId": slot.doctorSlotFK,
            "patientId": patient,
            "Operation": "ReservationCancelled",
        }
       # kafka_producer.produce_message("clinic_reservation", str(message))
        return Response("Appointment canceled successfully")
    except Appointment.DoesNotExist:
        return Response("Appointment Not Found", status=status.HTTP_400_BAD_REQUEST)
    except Patient.DoesNotExist:
        return Response("Patient not found", status=status.HTTP_404_NOT_FOUND)


@csrf_exempt
@api_view(["GET"])
def getDoctorNotifications(request):
    id = request.query_params.get("id")
    # kafka_consumer = KafkaConsumer(
    #     settings.KAFKA_CONFIG["bootstrap_servers"],
    #     settings.KAFKA_CONFIG["group_id"],
    #     settings.KAFKA_CONFIG["auto_offset_reset"],
    # )
    # messages = kafka_consumer.consume_messages("clinic_reservation")
    res = []
    for message in messages:
        data = json.loads(message.value())
        if int(data["doctorId"]) == int(id):
            res.append(message)
    context = {"messages": res}
    return JsonResponse(context)


@csrf_exempt
@api_view(["PUT"])
def editAppointment(request):
    parser = JSONParser().parse(request)
    appointmentID = parser.get("appointment_id")
    appointment = Appointment.objects.get(AppointmentId=appointmentID)
    slot = appointment.AppointmentSlotNumber
    # slot = Slot.objects.get(SlotId = slotNo)
    slot.Is_available = True
    slot.save()
    slot2 = Slot.objects.get(SlotId=parser.get("slot_id"))
    appointment.AppointmentSlotNumber = slot2
    slot2.Is_available = False
    slot2.save()
    appointment.save()
    # kafka_producer = KafkaProducer(settings.KAFKA_CONFIG["bootstrap_servers"])
    message = {
        "doctorId": slot.doctorSlotFK,
        "patientId": appointment.AppointmentPatientID,
        "Operation": "ReservationUpdated",
    }
    # kafka_producer.produce_message("clinic_reservation", str(message))
    return Response("Appointment edited successfully")


@csrf_exempt
@api_view(["GET"])
def listPatientReservation(request):
    patient_username = request.query_params.get("patient_username")
    patient = Patient.objects.get(PatientUserName=patient_username)
    appointments = Appointment.objects.filter(AppointmentPatientID=patient.PatientId)
    response_data = []

    for appointment in appointments:
        slot = appointment.AppointmentSlotNumber
        # if Slot.objects.get(SlotId = slot).Is_available:
        #     continue
        doctor = slot.doctorSlotFK

        appointment_data = {
            "date": slot.Date,
            "start_time": slot.StartTime,
            "end_time": slot.EndTime,
            "doctor_name": doctor.DoctorName,
        }

        response_data.append(appointment_data)

    return Response(response_data)



@csrf_exempt
@api_view(["GET"])
def listDoctorSlots(request):
    doctor_id = request.query_params.get("id")
    slots = Slot.objects.filter(doctorSlotFK=doctor_id)
    slot_serializer = SlotSerializer(slots, many=True)
    return Response(slot_serializer.data)


def listDoctors():
    doc = Doctor.objects.all()
    return doc

@csrf_exempt
@api_view(['PUT'])
def editSlot(request):
    try:
        parser = JSONParser().parse(request)
        slot_id = parser.get("slotId")
        date = parser.get("Date")
        start_time = parser.get("StartTime")
        end_time = parser.get("EndTime")
        date_obj = datetime.strptime(date, "%Y-%m-%d").date()
        slot = Slot.objects.get(SlotId=int(slot_id))
        slot.StartTime = start_time
        slot.EndTime = end_time
        slot.Date = date_obj

        if is_done(slot):
            return Response("cannot modify slot in the past", status=status.HTTP_304_NOT_MODIFIED)
        slot.save()
        return Response("slot modified successfully", status=status.HTTP_200_OK)

    except Exception as e:
        print(f"An error occurred: {e}")
        return Response("Bad Request", status=status.HTTP_400_BAD_REQUEST)




def sha256_hash(password):
    encoded = password.encode("utf-8")
    sha256 = hashlib.sha256()
    sha256.update(encoded)
    return sha256.hexdigest()
