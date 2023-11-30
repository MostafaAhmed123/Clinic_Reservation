from confluent_kafka import Producer


class KafkaProducer:
    def __init__(self, bootstrap_servers):
        self.producer = Producer({"bootstrap.servers": bootstrap_servers})

    def produce_message(self, topic, message):
        self.producer.produce(topic, value=message)
        # self.producer.flush()
