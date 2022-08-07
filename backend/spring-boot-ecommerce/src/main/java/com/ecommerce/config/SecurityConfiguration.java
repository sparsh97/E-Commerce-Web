package com.ecommerce.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests()
                .antMatchers("/api/orders/**")
                .authenticated()
                .and()
                .oauth2ResourceServer()
                .jwt();
        http.cors();

        Okta.configureResourceServer401ResponseBody(http);
        //disable CSRF we are not using cookeis for session management
        http.csrf().disable();
    }
}
