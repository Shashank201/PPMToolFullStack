package com.agileintelligence.ppmtool.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.agileintelligence.ppmtool.domain.User;

@Component
public class UserValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return User.class.equals(clazz);
	}

	@Override
	public void validate(Object object, Errors errors) {

		User user = (User) object;

		if (user.getPassword()== null || user.getPassword().length() < 6) {
			errors.rejectValue("password", "", "Password must be atleast 6 characters");
		}
		
		if (user.getConfirmPassword() == null || !user.getPassword().equals(user.getConfirmPassword())) {
			errors.rejectValue("confirmPassword", "", "Password must match Confirm password");
		}
	}

}
