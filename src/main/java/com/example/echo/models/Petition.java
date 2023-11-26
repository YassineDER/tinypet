package com.example.echo.models;

import com.example.echo.exceptions.CannotSignPetitionException;
import endpoints.repackaged.com.fasterxml.jackson.annotation.JsonFormat;
import endpoints.repackaged.com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.util.Date;
import java.util.List;

@JsonPropertyOrder({"id", "title", "description", "image", "creationDate", "tags", "signatureCount", "signatureGoal", "author", "comments"})
public class Petition {
    Long id;
    String title;
    String description;
    String image;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "EEE MMM dd HH:mm:ss zzz yyyy")
    Date creationDate;
    List<Tag> tags;
    Integer signatureCount;
    Integer signatureGoal;
    User author;
    List<Comment> comments;

    public Petition(String title, String description, String image, Integer signatureGoal, User author) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.creationDate = new Date();
        this.tags = List.of();
        this.signatureCount = 0;
        this.signatureGoal = signatureGoal;
        this.author = author;
        this.comments = List.of();

        this.author.createdPetitions.add(this);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Tag> getTags() {
        return tags;
    }

    // tags to be generated from text by a python script
    public void addTag(Tag tag) {
        if (this.tags.contains(tag))
            return;
        this.tags.add(tag);
    }

    public Integer getSignatureCount() {
        return signatureCount;
    }

    public void sign(User user) {
        if (this.signatureCount >= this.signatureGoal)
            throw new CannotSignPetitionException("Petition has reached signature goal");

        this.signatureCount++;
        user.signedPetitions.add(this);
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
    }
}
