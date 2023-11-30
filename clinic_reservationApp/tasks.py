from background_task import background
from .kafka_consumer import KafkaConsumer
from django.conf import settings


# @background(schedule=1)
def start_kafka_consumer():
    kafka_consumer = KafkaConsumer(
        settings.KAFKA_CONFIG["bootstrap_servers"],
        settings.KAFKA_CONFIG["group_id"],
        settings.KAFKA_CONFIG["auto_offset_reset"],
    )
    kafka_consumer.consume_messages("clinic_reservation")
