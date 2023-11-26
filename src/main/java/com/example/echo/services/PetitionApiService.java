package com.example.echo.services;

import com.example.echo.models.Petition;
import com.example.echo.models.User;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;

@Api(name = "petitions", version = "v1")
public class PetitionApiService {

    @ApiMethod(name = "addPetition", path = "create", httpMethod = ApiMethod.HttpMethod.POST)
    public void createPetition(Petition petition) {

    }
}
