package com.smartcrops.marketplace.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

/**
 * Loads .env file variables into Spring Environment
 * This runs before the application context is created
 */
public class DotEnvProperties implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        // Try to load .env from project root
        Dotenv dotenv = Dotenv.configure()
                .filename(".env")
                .directory(System.getProperty("user.dir"))
                .ignoreIfMissing()
                .load();

        // Add .env variables to Spring environment
        Map<String, Object> envProperties = new HashMap<>();
        dotenv.entries().forEach(entry ->
            envProperties.put(entry.getKey(), entry.getValue())
        );

        if (!envProperties.isEmpty()) {
            environment.getPropertySources().addLast(
                new MapPropertySource("dotenv", envProperties)
            );
        }
    }
}

