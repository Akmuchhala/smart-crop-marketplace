# Build Stage
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# Run Stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ENV JAVA_TOOL_OPTIONS="-XX:ActiveProcessorCount=1 \
                       -XX:MaxRAMPercentage=70.0 \
                       -XX:MinRAMPercentage=50.0 \
                       -XX:+UseSerialGC \
                       -Xss256k \
                       -XX:ReservedCodeCacheSize=128m \
                       -XX:MaxMetaspaceSize=128m"
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
