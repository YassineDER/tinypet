package com.example.echo.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.google.appengine.api.datastore.Text;

public class TextDeserializer extends JsonDeserializer<Text> {
    @Override
    public Text deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws java.io.IOException, JsonProcessingException {
        return new Text(jsonParser.getValueAsString());
    }
}
