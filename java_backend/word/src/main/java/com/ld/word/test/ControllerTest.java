package com.ld.word.test;

import java.util.List;
import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ld.word.model.User;
import com.ld.word.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class ControllerTest {
	
	@Autowired // ������ ����(DI)
	private UserRepository userRepository;
	private final BCryptPasswordEncoder passwordEncoder;
	
	
	@GetMapping("/user/{id}")
	public User getTest(@PathVariable int id) {
		User user = userRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("�ش� ������ �����ϴ�. id: " + id);
		});
		return user;
	}
	
	@GetMapping("/user/all")
	public List<User> getAll() {
		return userRepository.findAll();
	}
	
	// ���������� 2�ǿ� �����͸� ����
	@GetMapping("/user/all/page") // ���� �������� �ѱ���� ?page=0 ���� ������ �����ͷ� ������ ���������� �Ѿ��
	public Page<User> pageList(@PageableDefault(size = 2, sort = "id", direction = Direction.DESC) Pageable page) {
		Page<User> users = userRepository.findAll(page);
		return users;
	}
	
	@GetMapping("/user/name/{username}") // ��� �̸����� �˻�
	public User getName(@PathVariable String username) {
		System.out.println(username);
		return userRepository.findByUsername(username);
	}
	
	@GetMapping("home")
	public String home() {
		return "<h1>home</h1>";
	}
	
	@PostMapping("token")
	public String token() {
		return "<h1>token</h1>";
	}
	
	@PostMapping("join")
	public String join(@RequestBody User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword())); // 1234ppp -> ABC33333
		user.setRoles("ROLE_USER");
		userRepository.save(user);
		return "ȸ������ �Ϸ�";
	}
	
	
}