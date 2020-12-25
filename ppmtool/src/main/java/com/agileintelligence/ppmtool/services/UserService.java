package com.agileintelligence.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.agileintelligence.ppmtool.domain.User;
import com.agileintelligence.ppmtool.exceptions.UserNameAlreadyExistsException;
import com.agileintelligence.ppmtool.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public User saveUser(User newUser) {
		try {
			newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
			newUser.setUsername(newUser.getUsername()); // throws exception if user already exists
			newUser.setConfirmPassword("");
			return userRepository.save(newUser);
		} catch (Exception e) {
			throw new UserNameAlreadyExistsException("Username: '" + newUser.getUsername() + "' already exists");
		}
	}
}
