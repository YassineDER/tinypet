package com.example.echo.services;

import com.example.echo.models.Petition;
import com.example.echo.models.Tag;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiMethod.*;
import com.google.api.server.spi.config.Named;
import com.google.appengine.api.datastore.*;

import java.util.ArrayList;
import java.util.List;

@Api(name = "petitions", version = "v1")
public class PetitionApiService {
    private static final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

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

    @ApiMethod(name = "myPetitions", path = "mine", httpMethod = HttpMethod.GET)
    public List<Entity> getPetitions(@Named("user") String user) {
        Query q = new Query("Petition").addSort("creationDate", Query.SortDirection.DESCENDING);
        q.setFilter(new Query.FilterPredicate("author", Query.FilterOperator.EQUAL, user));
        return datastore.prepare(q).asList(FetchOptions.Builder.withLimit(10));
    }

    @ApiMethod(name = "getPetition", path = "get", httpMethod = HttpMethod.GET)
    public Entity getPetition(@Named("id") String id) {
        Query q = new Query("Petition");
        q.setFilter(new Query.FilterPredicate("id", Query.FilterOperator.EQUAL, id));
        return datastore.prepare(q).asSingleEntity();
    }

    @ApiMethod(name = "SignPetition", path = "sign", httpMethod = HttpMethod.PUT)
    public void signPetition(Petition petition) {
        Transaction t = datastore.beginTransaction();
        Entity p = getPetition(petition.getId().toString());
        p.setProperty("signatureCount", petition.getSignatureCount());
        datastore.put(p);
        t.commit();
    }

    // must be called with a page parameter (e.g. /api/petitions/all?page=1)
    @ApiMethod(name = "allPetitions", path = "all", httpMethod = HttpMethod.GET)
    public List<Entity> getAllPetitions(@Named("page") int page) {
        final int pageSize = 10;
        int offset = (page - 1) * pageSize;
        Query q = new Query("Petition").addSort("creationDate", Query.SortDirection.DESCENDING)
                .addSort("signatureCount", Query.SortDirection.ASCENDING);
        PreparedQuery pq = datastore.prepare(q);
        return pq.asList(FetchOptions.Builder.withLimit(pageSize).offset(offset));
    }

}
