from django.conf.urls import include
from django.urls import re_path
from clinic_reservationApp import views

urlpatterns = [
    re_path(r"^api/doctor/addDoctor$", views.AddDoctor),
    re_path(r"^api/patient/addPatient$", views.AddPatient),
    re_path(
        r"^api/doctor/createSlot$",
        views.create_slot,
    ),
    re_path(
        r"^api/patient/listDoctors$",
        views.list_doctor_names_specialties,
    ),
    re_path(
        r"^api/patient/viewDoctorSlots/$",
        views.view_available_slots,
    ),
    re_path(
        r"^api/patient/chooseSlot$",
        views.choose_slot,
    ),
    re_path(r"^api/patient/editAppointment$", views.editAppointment),
    re_path(r"^api/user/login$", views.login),
    re_path(r"^api/patient/listReservations$", views.listPatientReservation),
    re_path(r"^api/doctor/listDoctorsSlot$", views.listDoctorSlots),
    re_path(r"^api/doctor/deleteSlot$", views.deleteSlot),
    re_path(r"^api/user/getCurrentUser$", views.getUser),
    re_path(r"^api/doctor/getNotifications$", views.getDoctorNotifications),
    re_path(r"^api/doctor/editSlot$", views.editSlot),
    re_path(r"^api/patient/cancelAppointment$", views.cancel_appointment)
]
