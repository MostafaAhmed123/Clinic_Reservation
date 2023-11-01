from django.conf.urls import include
from django.urls import re_path
from clinic_reservationApp import views
urlpatterns = [
    re_path(r'^doctor/addDoctor$',views.AddDoctor),
    # re_path(r'^department/([0-9]+)$',views.departmentApi)

]