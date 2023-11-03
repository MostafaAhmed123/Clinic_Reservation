from django.shortcuts import render, get_object_or_404, redirect
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
                return JsonResponse({"status": True})
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


# user.set_password(user.password)
# role = serializer.validated_data['role']
# user = serializer.save()
#
def listDoctors():
    doc = Doctor.objects.all()
    return doc


def sha256_hash(password):
    encoded = password.encode("utf-8")
    sha256 = hashlib.sha256()
    sha256.update(encoded)
    return sha256.hexdigest()
