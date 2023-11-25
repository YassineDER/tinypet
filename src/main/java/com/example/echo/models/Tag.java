package com.example.echo.models;

import endpoints.repackaged.com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder("name")
public class Tag {
    String name;

    public Tag(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Tag other))
            return false;
        return this.name.trim().equalsIgnoreCase(other.name.trim());
    }

    @Override
    public String toString() {
        return this.name.trim().toLowerCase();
    }
}
