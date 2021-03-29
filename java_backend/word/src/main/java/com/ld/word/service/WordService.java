package com.ld.word.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ld.word.model.User;
import com.ld.word.model.Word;
import com.ld.word.repository.WordRepository;

@Service
public class WordService {
	
	@Autowired
	private WordRepository wordRepository;
	
	public Word wordAdd(Word word) throws Exception {
		return wordRepository.save(word);
	}
	
	public List<Word> wordList(int id) throws Exception {
		return wordRepository.findByUserid(id);
	}
	
}
