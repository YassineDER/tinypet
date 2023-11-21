package com.example.echo.models;

import java.util.Date;
import java.util.List;

public class User {
    String name;
    String email;
    String image;
    Date registredDate;
    List<Petition> signedPetitions;
    List<Petition> createdPetitions;

    public User(String name, String email, String image) {
        this.name = name;
        this.email = email;
        this.image = image;
        this.registredDate = new Date();
        this.signedPetitions = List.of();
        this.createdPetitions = List.of();
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

    public List<Petition> getSignedPetitions() {
        return signedPetitions;
    }

    public List<Petition> getCreatedPetitions() {
        return createdPetitions;
    }


}
