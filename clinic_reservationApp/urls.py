from django.conf.urls import include
from django.urls import re_path
from clinic_reservationApp import views

urlpatterns = [
    re_path(r"^doctor/addDoctor$", views.AddDoctor),
    re_path(r"^patient/addPatient$", views.AddPatient),
    re_path(
        r"^doctor/createSlot$",
        views.create_slot,
    ),
    re_path(
        r"^patient/listDoctors$",
        views.list_doctor_names_specialties,
    ),
    re_path(
        r"^patient/viewDoctorSlots/$",
        views.view_available_slots,
    ),
    re_path(
        r"^patient/chooseSlot$",
        views.choose_slot,
    ),
    re_path(r"^patient/editAppointment$", views.editAppointment),
    re_path(r"^user/login$", views.login),
    re_path(r"^patient/listReservations$", views.listPatientReservation),
    re_path(r"^doctor/listDoctorsSlot$", views.listDoctorSlots),
    re_path(r"^doctor/deleteSlot$", views.deleteSlot),
    re_path(r"^user/getCurrentUser$", views.getUser),
    re_path(r"^doctor/getNotifications$", views.getDoctorNotifications),
    re_path(r"^doctor/editSlot$", views.editSlot),
    re_path(r"^patient/cancelAppointment", views.cancel_appointment)
]
