package com.example.echo.services;

import com.example.echo.models.Petition;
import com.example.echo.models.Tag;
import com.example.echo.models.User;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiMethod.*;
import com.google.api.server.spi.config.Named;
import com.google.appengine.api.datastore.*;

import java.util.ArrayList;
import java.util.List;

@Api(name = "petitions", version = "v1")
public class PetitionApiService {
    private static final DatastoreService datastore = com.google.appengine.api.datastore.DatastoreServiceFactory.getDatastoreService();
//    private static final String BUCKET_NAME = "tinypet-404519.appspot.com";
//    private final BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();

    @ApiMethod(name = "addPetition", path = "create", httpMethod = HttpMethod.POST)
    public Entity createPetition(Petition petition) {
        Entity p = new Entity("Petition");
        p.setProperty("id", petition.getId());
        p.setProperty("title", petition.getTitle());
        p.setProperty("description", petition.getDescription());
        p.setProperty("author", petition.getAuthor());
        p.setProperty("signatureCount", petition.getSignatureCount());
        p.setProperty("signatureGoal", petition.getSignatureGoal());
        p.setProperty("creationDate", petition.getCreationDate());
        p.setProperty("image", petition.getImage());
        List<Tag> tags = petition.getTags();
        List<EmbeddedEntity> embeddedTags = new ArrayList<>();
        for (Tag tag : tags) {
            EmbeddedEntity embeddedTag = new EmbeddedEntity();
            embeddedTag.setProperty("name", tag.getName());
            embeddedTags.add(embeddedTag);
        }
        p.setProperty("tags", embeddedTags);

        Transaction t = datastore.beginTransaction();
        datastore.put(p);
        // TODO: Add petition to user's list of petitions
        t.commit();
        return p;
    }

    @ApiMethod(name = "myPetitions", path = "of", httpMethod = HttpMethod.GET)
    public List<Entity> getPetitions(User user) {
        Query q = new Query("Petition");
        q.setFilter(new Query.FilterPredicate("author", Query.FilterOperator.EQUAL, user.getName()));
        return datastore.prepare(q).asList(FetchOptions.Builder.withLimit(10));
    }

    @ApiMethod(name = "signPetition", path = "sign", httpMethod = HttpMethod.POST)
    public void signPetition(User user) {

    }

    // must be called with a page parameter (e.g. /api/petitions/all?page=1)
    @ApiMethod(name = "allPetitions", path = "all", httpMethod = HttpMethod.GET)
    public List<Entity> getAllPetitions(@Named("page") int page) {
        final int pageSize = 10;
        int offset = (page - 1) * pageSize;
        Query q = new Query("Petition");
        PreparedQuery pq = datastore.prepare(q);
        return pq.asList(FetchOptions.Builder.withLimit(pageSize).offset(offset));
    }

}
