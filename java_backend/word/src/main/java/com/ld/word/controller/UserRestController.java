package com.ld.word.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ld.word.model.User;
import com.ld.word.service.UserService;

@RestController
public class UserRestController {
	
	@Autowired
	private UserService us;
	
	@PostMapping("/api/user/register")
	public ResponseEntity<?> register(@RequestBody User user) throws Exception {
		System.out.println("UserController Register ---> " + user);
		
		try {
			if(us.findByUsername(user.getUsername()) != null) {
				return new ResponseEntity<String>("EXIST", HttpStatus.CONFLICT);
			}
			us.register(user);
			return new ResponseEntity<String>("SUCCESS", HttpStatus.CREATED);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity<String>("error", HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/api/user/login")
	public User login(@RequestBody User user) throws Exception {
		return us.findByUsername(user.getUsername());
	}
}
