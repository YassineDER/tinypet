package com.example.echo.config;

import com.fasterxml.jackson.databind.JsonSerializer;
import com.google.appengine.api.datastore.Text;

public class TextSerializer extends JsonSerializer<Text> {
    @Override
    public void serialize(Text text, com.fasterxml.jackson.core.JsonGenerator jsonGenerator, com.fasterxml.jackson.databind.SerializerProvider serializerProvider) throws java.io.IOException {
        jsonGenerator.writeString(text.getValue());
    }
}
