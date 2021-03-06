package com.ld.word.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ld.word.model.User;
import com.ld.word.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	private final BCryptPasswordEncoder passwordEncoder;
	
	public User register(User user) throws Exception {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}
	
	public User findByUsername(String username) throws Exception {
		return userRepository.findByUsername(username);
	}
}
