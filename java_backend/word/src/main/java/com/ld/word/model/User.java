package com.ld.word.model;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity // User 
// @DynamicInsert �μ�Ʈ�ÿ� ���� �ʵ带 ����
public class User {
	
	@Id // Primary Key
	@GeneratedValue(strategy = GenerationType.IDENTITY) // 
	private int id; // 
	
	@Column(nullable=false, length = 30, unique = true)
	private String username;
	
	@Column(nullable = false, length = 100) 
	private String password;
	
	@Column(nullable = false, length = 50)
	private String email;
	
	//@Column(nullable = false, columnDefinition = "TIMESTAMP NOT NULL DEFAULT now()") 
	@CreationTimestamp
	private Timestamp regdate;
	
	@Column(nullable = false)
	private String roles = "ROLE_USER";
	
	@Column(nullable = false)
	private boolean available = true;
	
//	@JsonIgnoreProperties({"user"})
//	@OneToMany(mappedBy = "user") // 
//	private List<Word> word;
	
	public List<String> getRoleList() {
		if(this.roles.length() > 0) {
			return Arrays.asList(this.roles.split(","));
		}
		return new ArrayList<>();
	}
}
