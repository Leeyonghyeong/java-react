package com.ld.word.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ld.word.model.User;

// DAO
// @Repository 로 빈등록을 해야 되지만
// JpaRepository 를 상속 받으면 자동으로 빈으로 등록이 된다.
public interface UserRepository extends JpaRepository<User, Integer>{
	
	public User findByUsername(String username);
}
