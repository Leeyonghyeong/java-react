package com.ld.word.test;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
//@RequiredArgsConstructor // final �� ���� ������ ���� �����ڸ� �������
//@AllArgsConstructor
@NoArgsConstructor
public class Member {
	
	private int id;
	private String username;
	private String password;
	private String email;
	
	@Builder // �޴� ���ڴ� 4������ ���� ���Ѵ� ���ڸ� �־ ������ �� ����
	public Member(int id, String username, String password, String email) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
	}
}