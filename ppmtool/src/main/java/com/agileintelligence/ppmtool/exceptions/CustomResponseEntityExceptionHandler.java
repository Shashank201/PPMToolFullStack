package com.agileintelligence.ppmtool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestController
@RestControllerAdvice
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler
	public final ResponseEntity<Object> HandlerProjectIdException(ProjectIdException ex, WebRequest request) {
		ProjectIdExceptionResponse response = new ProjectIdExceptionResponse(ex.getMessage());
		return new ResponseEntity<Object>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler
	public final ResponseEntity<Object> HandlerProjectNotFoundException(ProjectNotFoundException ex, WebRequest request) {
		ProjectNotFoundExceptionResponse response = new ProjectNotFoundExceptionResponse(ex.getMessage());
		return new ResponseEntity<Object>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler
	public final ResponseEntity<Object> HandlerUserNameAlreadyExistsException(UserNameAlreadyExistsException ex, WebRequest request) {
		UserNameAlreadyExistsExceptionResponse response = new UserNameAlreadyExistsExceptionResponse(ex.getMessage());
		return new ResponseEntity<Object>(response, HttpStatus.BAD_REQUEST);
	}
}
