package com.example.echo.services;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.datastore.*;

import java.util.List;

@Api(name = "comments", version = "v1")
public class CommentApiService {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    @ApiMethod(name = "getComments", path = "all", httpMethod = ApiMethod.HttpMethod.GET)
    public List<Entity> getComments() {
        Query query = new Query("Comment");
        return datastore.prepare(query).asList(FetchOptions.Builder.withDefaults());
    }

}
