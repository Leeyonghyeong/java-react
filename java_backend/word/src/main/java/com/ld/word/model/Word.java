package com.ld.word.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Word {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
	private Long id;
	
	@Column(nullable = false)
	private String eng;
	
	@Column(nullable = false)
	private String kor;
	
	@CreationTimestamp // �ð��� �ڵ� �Է�
	private Timestamp regdate;
	
	@Column(nullable = false)
	private int userid;
	
//	@ManyToOne // Many = word, One = user
//	@JoinColumn(name="userid", nullable = false)
//	@JsonIgnoreProperties({"word"})
//	private User user; 
	
}
