package com.ecommerce.config;

import com.ecommerce.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    @Value("${allowed.origins}")
    private String origin;
    @Value("${spring.data.rest.base-path}")
    private String basePath;
    @Autowired
    private EntityManager entityManager;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] unSupp = {HttpMethod.DELETE, HttpMethod.POST, HttpMethod.PUT, HttpMethod.PATCH};

//        disableHttpCallConfig(Product.class,config, unSupp);
//        disableHttpCallConfig(ProductCategory.class,config, unSupp);
//        disableHttpCallConfig(State.class,config, unSupp);
//        disableHttpCallConfig(Country.class,config, unSupp);
//        disableHttpCallConfig(Order.class,config,unSupp);

        cors.addMapping(basePath + "/**").allowedOrigins(origin);

        exposeIds(config);
    }

    private void disableHttpCallConfig(Class theClass,RepositoryRestConfiguration config, HttpMethod[] unSupp) {
        config.getExposureConfiguration().forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unSupp)))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unSupp));
    }

    private void exposeIds(RepositoryRestConfiguration config) {

        //get list of all entities classes from entity manager
        Set<EntityType<?>> entityTypeSet = entityManager.getMetamodel().getEntities();

        // create array of the entity types
        List<Class> entityClasses = new ArrayList<>();

        //get the entity types from the entitySet
        for(EntityType entityType: entityTypeSet) {
            entityClasses.add(entityType.getJavaType());
        }

        // expose the entity ids for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

    }
}
