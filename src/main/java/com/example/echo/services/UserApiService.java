package com.example.echo.services;

import com.example.echo.models.User;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.datastore.*;

import java.util.Date;
import java.util.List;

@Api(name = "users", version = "v1")
public class UserApiService {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();


    @ApiMethod(name = "addUser", path = "add", httpMethod = ApiMethod.HttpMethod.POST)
    public Entity registerUser(User user) {
        // check if user already exists
        Query q = new Query("User");
        q.setFilter(new Query.FilterPredicate("id", Query.FilterOperator.EQUAL, user.getId()));
        if (datastore.prepare(q).countEntities(FetchOptions.Builder.withDefaults()) > 0) {
            PreparedQuery pq = datastore.prepare(q);
            return pq.asSingleEntity();
        }
        // new user entity
        Entity userEntity = new Entity("User");
        userEntity.setProperty("id", user.getId());
        userEntity.setProperty("name", user.getName());
        userEntity.setProperty("email", user.getEmail());
        userEntity.setProperty("image", user.getImage());
        userEntity.setProperty("registredDate", new Date());
        userEntity.setProperty("signedPetitions", List.of());
        userEntity.setProperty("createdPetitions", List.of());

        // save user in datastore, return user entity if successful or throw exception and rollback
        Transaction t = datastore.beginTransaction();
        try {
            datastore.put(userEntity);
            t.commit();
            return userEntity;
        } catch (Exception e) {
            t.rollback();
            throw e;
        }
    }


    @ApiMethod(name = "deleteUser", path = "delete", httpMethod = ApiMethod.HttpMethod.DELETE)
    public void deleteUser(User user) {
        Query q = new Query("User");
        PreparedQuery pq = datastore.prepare(q);
        Transaction t = datastore.beginTransaction();
        try {
            datastore.delete(pq.asSingleEntity().getKey());
            t.commit();
        } catch (Exception e) {
            t.rollback();
            throw e;
        }
    }

    @ApiMethod(name = "getUser", path = "all", httpMethod = ApiMethod.HttpMethod.GET)
    public List<Entity> getAllUsers() {
        Query q = new Query("User");
        PreparedQuery pq = datastore.prepare(q);
        return pq.asList(FetchOptions.Builder.withDefaults());
    }

}
