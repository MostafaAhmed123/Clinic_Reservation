from django.apps import AppConfig


class ClinicReservationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "clinic_reservationApp"

    def ready(self):
        start_kafka_consumer(repeat=60)
