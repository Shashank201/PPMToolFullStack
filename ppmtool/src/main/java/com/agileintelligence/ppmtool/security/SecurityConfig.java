package com.agileintelligence.ppmtool.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.agileintelligence.ppmtool.services.CustomUserDetailsService;

import static com.agileintelligence.ppmtool.security.SecurityConstants.SIGN_UP_URLS;
import static com.agileintelligence.ppmtool.security.SecurityConstants.H2_URL;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Autowired
	private CustomUserDetailsService customUserDetailService;

	@Bean
	public JwtAuthenticationFilter jwtAuthenticationFilter() {
		return new JwtAuthenticationFilter();
	}

	@Autowired
	private BCryptPasswordEncoder bcryptPasswordEncoder;

	@Override
	protected void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(customUserDetailService).passwordEncoder(bcryptPasswordEncoder);
	}

	@Override

	@Bean(BeanIds.AUTHENTICATION_MANAGER)
	protected AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.cors().and().csrf().disable()
				.exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
				.and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.headers().frameOptions().sameOrigin() // build application without mysql - to enable H2 database
				.and()
				.authorizeRequests()
				.antMatchers("/", "/favicon.ico", "/**/*.png", "/**/*.svg", "/**/*.jpg", "/**/*.jsp", "/**/*.html",
						"/**/*.css", "/**/*.js")
				.permitAll() // Public routes
				.antMatchers(SIGN_UP_URLS).permitAll()
				.antMatchers(H2_URL).permitAll()
				.anyRequest().authenticated();
		
		http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

	}
}
