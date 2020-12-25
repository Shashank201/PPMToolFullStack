package com.agileintelligence.ppmtool.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.agileintelligence.ppmtool.exceptions.InvalidLoginResponse;
import com.google.gson.Gson;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint{

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {

		InvalidLoginResponse invalidLoginResponse = new InvalidLoginResponse();
		String jsonLoginResponse = new Gson().toJson(invalidLoginResponse);
		
		response.setContentType("application/json");
		response.setStatus(401);
		response.getWriter().print(jsonLoginResponse);
	}
	

}
