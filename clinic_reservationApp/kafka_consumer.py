from confluent_kafka import Consumer, KafkaException
from django.conf import settings


class KafkaConsumer:
    def __init__(self, bootstrap_servers, group_id, auto_offset_reset):
        self.consumer = Consumer(
            {
                "bootstrap.servers": bootstrap_servers,
                "group.id": group_id,
                "auto.offset.reset": auto_offset_reset,
            }
        )

    def consume_messages(self, topic):
        self.consumer.subscribe([topic])
        messages = []
        while True:
            try:
                msg = self.consumer.poll(1.0)  # 1-second timeout
                if msg is None:
                    continue
                if msg.error():
                    if msg.error().code() == KafkaException._PARTITION_EOF:
                        continue
                    else:
                        print(msg.error())
                        break
                # Process the reservation event here
                messages.append(msg.value().decode("utf-8"))

            except KeyboardInterrupt:
                break
        self.consumer.close()
        return messages
