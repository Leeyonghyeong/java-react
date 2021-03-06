package com.ld.word.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ld.word.model.Word;
import com.ld.word.service.WordService;

@RestController
public class WordRestController {
	
	@Autowired
	private WordService ws;
	
	@PostMapping("/api/word/add")
	public ResponseEntity<?> wordAdd(@RequestBody Word word) throws Exception {
		System.out.println("WordController add ---> " + word);

		try {
			ws.wordAdd(word);
			return new ResponseEntity<String>("SUCCESS", HttpStatus.CREATED);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity<String>("error", HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/api/word/list/{userid}")
	public ResponseEntity<?> wordList(@PathVariable int userid) throws Exception {
		System.out.println("WordController list ---> " + userid);
		try {
			List<Word> words = new ArrayList<Word>();
			words = ws.wordList(userid);
			
			if(words.size() <= 0) {
				return null;
			}
			
			return new ResponseEntity<List<Word>>(words, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
		}
	}
	
}
