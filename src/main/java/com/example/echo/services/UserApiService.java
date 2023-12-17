package com.example.echo.services;

import com.example.echo.exceptions.CannotValidateTokenException;
import com.example.echo.models.User;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.Named;
import com.google.appengine.api.datastore.*;

import java.util.Date;
import java.util.List;

@Api(name = "users", version = "v1")
public class UserApiService {
    static final GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
            .setAudience(List.of("527092413767-a12gm70hgua8ers9ommcuqk77919ci4j.apps.googleusercontent.com"))
            .build();

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();


    @ApiMethod(name = "deleteUser", path = "delete", httpMethod = ApiMethod.HttpMethod.DELETE)
    public void deleteUser(User user) {
        Query q = new Query("User");
        PreparedQuery pq = datastore.prepare(q);
        Transaction t = datastore.beginTransaction();
        datastore.delete(pq.asSingleEntity().getKey());
        t.commit();
    }

    @ApiMethod(name = "getUsers", path = "all", httpMethod = ApiMethod.HttpMethod.GET)
    public List<Entity> getAllUsers() {
        Query q = new Query("User");
        PreparedQuery pq = datastore.prepare(q);
        return pq.asList(FetchOptions.Builder.withLimit(20));
    }


    @ApiMethod(name = "validateToken", path = "validate-token", httpMethod = ApiMethod.HttpMethod.POST)
    public Entity validateAndRegisterUser(@Named("token") String token) {
        // Verify token
        try {
            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
               GoogleIdToken.Payload payload = idToken.getPayload();

                // Extract user information from payload
                String userId = payload.getSubject();
                String email = payload.getEmail();
                String name = (String) payload.get("name");
                String imageUrl = (String) payload.get("picture");

                // Check if user already exists in datastore
                Query q = new Query("User");
                q.setFilter(new Query.FilterPredicate("id", Query.FilterOperator.EQUAL, userId));
                if (datastore.prepare(q).countEntities(FetchOptions.Builder.withDefaults()) > 0) {
                    PreparedQuery pq = datastore.prepare(q);
                    return pq.asSingleEntity();
                }

                // In this case, user does not exist in datastore, create new user entity
                Entity userEntity = new Entity("User");
                userEntity.setProperty("id", userId);
                userEntity.setProperty("name", name);
                userEntity.setProperty("email", email);
                userEntity.setProperty("image", imageUrl);
                userEntity.setProperty("registredDate",  new Date());
                userEntity.setProperty("signedPetitions", List.of());
                userEntity.setProperty("createdPetitions", List.of());

                // Save user in datastore
                Transaction t = datastore.beginTransaction();
                datastore.put(userEntity);
                t.commit();
                return userEntity;
            } else {
                throw new IllegalArgumentException("Invalid ID token.");
            }
        } catch (Exception e) {
            throw new CannotValidateTokenException("Cannot login / register. " + e.getMessage());
        }
    }
}
