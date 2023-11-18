package com.example.echo;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiMethod.*;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.appengine.api.datastore.*;
import java.util.List;

@Api(name = "employees", version = "v1", namespace = @ApiNamespace(ownerDomain = "echo.example.com", ownerName = "echo.example.com", packagePath = ""))
public class Echo {

    @ApiMethod(name = "allEmployees", path = "all", httpMethod = HttpMethod.GET)
    public List<Entity> getEmployees() {
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Query q = new Query("Employee");
        PreparedQuery pq = datastore.prepare(q);
        List<Entity> employees = pq.asList(FetchOptions.Builder.withDefaults());
        return employees;
    }

    @ApiMethod(name = "firstEmployee", path = "first", httpMethod = HttpMethod.GET)
    public Entity getFirstEmployee() {
        Query q = new Query("Employee");
        DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery pq = ds.prepare(q);
        return pq.asSingleEntity();
    }

    @ApiMethod(name = "addEmployee", path = "add", httpMethod = HttpMethod.POST)
    public Employee addEmployee(Employee employee) {
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Entity employeeEntity = new Entity("Employee");
        employeeEntity.setProperty("name", employee.getName());
        employeeEntity.setProperty("email", employee.getEmail());
        employeeEntity.setProperty("phone", employee.getPhone());
        employeeEntity.setProperty("job_title", employee.getJob_title());
        employeeEntity.setProperty("image_url", employee.getImage_url());
        Transaction t = datastore.beginTransaction();
        datastore.put(employeeEntity);
        t.commit();

        return employee;
    }


}
