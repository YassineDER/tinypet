package com.example.echo.services;

import com.example.echo.models.Petition;
import com.example.echo.models.Tag;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiMethod.*;
import com.google.appengine.api.datastore.*;
import java.util.List;

@Api(name = "tags", version = "v1")
public class TagApiService {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    @ApiMethod(name = "allTags", path = "all", httpMethod = HttpMethod.GET)
    public List<Entity> getTags() {
        Query q = new Query("Tag");
        PreparedQuery pq = datastore.prepare(q);
        List<Entity> results = pq.asList(FetchOptions.Builder.withDefaults());
        return results;
    }

    @ApiMethod(name = "addTag", path = "add", httpMethod = HttpMethod.POST)
    public Tag addTag(Tag tag) {
        Entity tagEntity = new Entity("Tag");
        tagEntity.setProperty("name", tag.toString());
        Transaction t = datastore.beginTransaction();
        datastore.put(tagEntity);
        t.commit();
        return tag;
    }


}
