FROM confluentinc/cp-kafka:latest

ENV KAFKA_HOME /etc/confluent/docker

COPY server.properties $KAFKA_HOME/server.properties
COPY zookeeper.properties $KAFKA_HOME/zookeeper.properties

EXPOSE 9092 2181

CMD ["/etc/confluent/docker/run"]