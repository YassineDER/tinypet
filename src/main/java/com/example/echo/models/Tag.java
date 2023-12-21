package com.example.echo.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "name")
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonPropertyOrder("name")
public class Tag {
    String name;

    public String getName() {return name;}

    public Tag() {}

    @Override
    public boolean equals(Object obj) {
        if (obj == null || obj.getClass() != this.getClass()) return false;
        return this.name.trim().equalsIgnoreCase(((Tag) obj).name.trim());
    }

    @Override
    public String toString() {
        return this.name.trim().toLowerCase();
    }
}
