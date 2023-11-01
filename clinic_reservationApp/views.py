from django.shortcuts import render, get_object_or_404, redirect
from .models import Doctor
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from .serializers import DoctorSerializer
import hashlib
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.decorators import api_view, renderer_classes
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

# Create your views here.

@csrf_exempt
@api_view(('POST',))
def AddDoctor(request):
    if request.method == 'POST':
        doc = JSONParser().parse(request)
        serializer = DoctorSerializer(data=doc)

        if serializer.is_valid():
            # Check if the username is unique
            doctor_username = serializer.validated_data.get('DoctorUserName')
            if Doctor.objects.filter(DoctorUserName=doctor_username).exists():
                return Response("Username already exists. Please choose a different one.", status=status.HTTP_400_BAD_REQUEST)
            
            # Save the new Doctor instance
            serializer.save()
            return Response("Doctor added successfully", status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response("Invalid HTTP method", status=status.HTTP_405_METHOD_NOT_ALLOWED)



def listDoctors(request):
    doc = Doctor.objects.all()
    return doc

def sha256_hash(password):
    encoded = password.encode('ut')