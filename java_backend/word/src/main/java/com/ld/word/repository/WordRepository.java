package com.ld.word.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ld.word.model.Word;

public interface WordRepository extends JpaRepository<Word, Long>{
	
	public List<Word> findByUserid(int id);

}
