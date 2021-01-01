package com.agileintelligence.ppmtool.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agileintelligence.ppmtool.domain.User;
import com.agileintelligence.ppmtool.payload.JWTUserLoginSuccessResponse;
import com.agileintelligence.ppmtool.payload.LoginRequest;
import com.agileintelligence.ppmtool.security.JwtTokenProvider;
import com.agileintelligence.ppmtool.security.SecurityConstants;
import com.agileintelligence.ppmtool.services.MapValidateErrorService;
import com.agileintelligence.ppmtool.services.UserService;
import com.agileintelligence.ppmtool.validator.UserValidator;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

	@Autowired
	private MapValidateErrorService mapValidationErrorService;

	@Autowired
	private UserService userService;

	@Autowired
	private UserValidator userValidatior;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JwtTokenProvider tokenProvider;

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
		// validate passwords match
		userValidatior.validate(user, result);

		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidateError(result);
		if (errorMap != null)
			return errorMap;

		User newUser = userService.saveUser(user);

		return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidateError(result);
		if (errorMap != null)
			return errorMap;

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		/* --------------Generating JWT Token------------- */

		String jwt = SecurityConstants.TOKEN_PREFIX + tokenProvider.generateToken(authentication);

		return ResponseEntity.ok(new JWTUserLoginSuccessResponse(true, jwt));
	}
}
