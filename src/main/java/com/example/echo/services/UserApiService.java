package com.example.echo.services;

import com.example.echo.models.User;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.datastore.*;

@Api(name = "users", version = "v1")
public class UserApiService {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    @ApiMethod(name = "addUser", path = "add", httpMethod = ApiMethod.HttpMethod.POST)
    public User registerUser(User user) {
        Entity userEntity = new Entity("User");
        User U = new User(user.getName(), user.getEmail(), user.getImage());
        userEntity.setProperty("name", U.getName());
        userEntity.setProperty("email", U.getEmail());
        userEntity.setProperty("image", U.getImage());
        userEntity.setProperty("registredDate", U.getRegistredDate());
        userEntity.setProperty("signedPetitions", U.getSignedPetitions());
        userEntity.setProperty("createdPetitions", U.getCreatedPetitions());
        Transaction t = datastore.beginTransaction();
        datastore.put(userEntity);
        t.commit();
        return user;
    }

    @ApiMethod(name = "getUser", path = "get", httpMethod = ApiMethod.HttpMethod.GET)
    public Entity getUser(User user) {
        Query q = new Query("User");
        PreparedQuery pq = datastore.prepare(q);
        return pq.asSingleEntity();
    }

    @ApiMethod(name = "deleteUser", path = "delete", httpMethod = ApiMethod.HttpMethod.DELETE)
    public void deleteUser(User user) {
        Query q = new Query("User");
        PreparedQuery pq = datastore.prepare(q);
        Transaction t = datastore.beginTransaction();
        datastore.delete(pq.asSingleEntity().getKey());
        t.commit();
    }

}
