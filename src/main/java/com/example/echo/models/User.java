package com.example.echo.models;

import com.fasterxml.jackson.annotation.*;

import java.util.List;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonPropertyOrder({"id", "name", "email", "image", "signedPetitions", "createdPetitions"})
public class User {
    String id;
    String name;
    String email;
    String image;
    List<Petition> signedPetitions;
    List<Petition> createdPetitions;

    public User() {}

    public User(String id, String name, String email, String image, List<Petition> signedPetitions, List<Petition> createdPetitions) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.image = image;
        this.signedPetitions = signedPetitions;
        this.createdPetitions = createdPetitions;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getImage() {
        return image;
    }

    public List<Petition> getSignedPetitions() {
        return signedPetitions;
    }

    public void setSignedPetitions(List<Petition> signedPetitions) {
        this.signedPetitions = signedPetitions;
    }

    public List<Petition> getCreatedPetitions() {
        return createdPetitions;
    }

    public void setCreatedPetitions(List<Petition> createdPetitions) {
        this.createdPetitions = createdPetitions;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setImage(String image) {
        this.image = image;
    }


}
