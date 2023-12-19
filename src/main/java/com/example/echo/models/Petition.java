package com.example.echo.models;

import com.example.echo.config.TextDeserializer;
import com.example.echo.config.TextSerializer;
import com.example.echo.exceptions.CannotSignPetitionException;
import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.google.appengine.api.datastore.Text;

import java.util.Date;
import java.util.List;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonPropertyOrder({"id", "title", "description", "image", "creationDate", "tags", "signatureCount", "signatureGoal", "author"})
public class Petition {
    Long id;
    String title;
    String description;
    @JsonDeserialize(using = TextDeserializer.class)
    Text image;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "EEE MMM dd HH:mm:ss zzz yyyy")
    Date creationDate;
    List<Tag> tags;
    Integer signatureCount;
    Integer signatureGoal;
    String author;

    public Petition() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonProperty("tags")
    public List<Tag> getTags() {
        return tags;
    }

    public Integer getSignatureCount() {
        return signatureCount;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Text getImage() {
        return image;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public Integer getSignatureGoal() {
        return signatureGoal;
    }

    public String getAuthor() {
        return author;
    }
}
