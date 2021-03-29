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
@Entity // User 클래스가 MySQL에 테이블이 생성이 된다.
// @DynamicInsert 인서트시에 널인 필드를 제외
public class User {
	
	@Id // Primary Key
	@GeneratedValue(strategy = GenerationType.IDENTITY) // 프로젝트에서 연결된 DB의 넘버링 전략을 따라간다. (즉 mysql 사용지 auto_increment, 오라클인 경우 시퀀스를 사용한다는 뜻)
	private int id; // 시퀀스, auto_increment
	
	@Column(nullable=false, length = 30, unique = true)
	private String username;
	
	@Column(nullable = false, length = 100) // 123456 => 해쉬(비밀번호 암호화)
	private String password;
	
	@Column(nullable = false, length = 50)
	private String email;
	
	//@Column(nullable = false, columnDefinition = "TIMESTAMP NOT NULL DEFAULT now()") // 시간이 자동 입력
	@CreationTimestamp
	private Timestamp regdate;
	
	@Column(nullable = false)
	private String roles = "ROLE_USER";
	
	@Column(nullable = false)
	private boolean available = true;
	
//	@JsonIgnoreProperties({"user"})
//	@OneToMany(mappedBy = "user") // mappedBy 연관관계의 주인이 아니다(난 FK가 아니에요) DB에 컬럼을 만들지 마세요.
//	private List<Word> word;
	
	public List<String> getRoleList() {
		if(this.roles.length() > 0) {
			return Arrays.asList(this.roles.split(","));
		}
		return new ArrayList<>();
	}
}
