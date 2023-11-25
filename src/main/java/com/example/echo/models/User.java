package com.example.echo.models;

import endpoints.repackaged.com.fasterxml.jackson.annotation.*;

import java.util.Date;
import java.util.List;

@JsonPropertyOrder({"id", "name", "email", "image", "registredDate", "signedPetitions", "createdPetitions"})
public class User {
    String id;
    String name;
    String email;
    String image;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "EEE MMM dd HH:mm:ss zzz yyyy")
    Date registredDate;
    List<Petition> signedPetitions;
    List<Petition> createdPetitions;

    public User() {}

    public User(String id, String name, String email, String image, Date registredDate, List<Petition> signedPetitions, List<Petition> createdPetitions) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.image = image;
        this.registredDate = registredDate;
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

    public Date getRegistredDate() {
        return registredDate;
    }

    public void setRegistredDate(Date registredDate) {
        this.registredDate = registredDate;
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
}
