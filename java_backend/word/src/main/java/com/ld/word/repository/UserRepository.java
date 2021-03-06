package com.ld.word.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ld.word.model.User;

// DAO
// @Repository 
// JpaRepository 
public interface UserRepository extends JpaRepository<User, Integer>{
	
	public User findByUsername(String username);
}
