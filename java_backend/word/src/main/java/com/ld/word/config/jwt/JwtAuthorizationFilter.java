package com.ld.word.config.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ld.word.config.auth.PrincipalDetail;
import com.ld.word.model.User;
import com.ld.word.repository.UserRepository;

// ��ť��Ƽ�� filter ������ �ִµ� �� �����߿� BasicAuthenticationFilter ��� ���� ����
// �����̳� ������ �ʿ��� Ư�� �ּҸ� ��û���� �� �� ���͸� ������ Ÿ�� �Ǿ�����.
// ���࿡ �����̳� ������ �ʿ��� �ּҰ� �ƴ϶�� �� ���͸� ��Ž
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
	
	private UserRepository userRepository;

	public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
		super(authenticationManager);
		// TODO Auto-generated constructor stub
		this.userRepository = userRepository;
	}
	
	// �����̳� ������ �ʿ��� �ּҿ�û�� ���� �� �ش� ���͸� Ÿ�� ��.
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// TODO Auto-generated method stub		
		System.out.println("�����̳� ������ �ʿ��� �ּ� ��û��");
		
		String jwtHeader = request.getHeader("access_token");
		System.out.println("jwtHeader ---> " + jwtHeader);
		
		// header �� �ִ��� Ȯ��
		//if(jwtHeader == null || !jwtHeader.startsWith("Bearer")) {
		if(jwtHeader == null) {
			chain.doFilter(request, response);
			return;
		}
		
		// JWT ��ū�� ������ �ؼ� �������� ��������� Ȯ��
		String jwtToken = request.getHeader("access_token").replace("Bearer ", "");
		System.out.println("jwtToken ---> " + jwtToken);
		String username = JWT.require(Algorithm.HMAC256("mySecretKey")).build().verify(jwtToken).getClaim("username").asString();
		System.out.println("username ---> " + username);
		// ������ ���������� ��
		if(username != null) {
			User user = userRepository.findByUsername(username);
			
			PrincipalDetail principalDetail = new PrincipalDetail(user);
			
			// Jwt ��ū ������ ���ؼ� ������ �����̸� Authentication ��ü�� ����� �ش�.
			Authentication authentication = 
					new UsernamePasswordAuthenticationToken(principalDetail, null, principalDetail.getAuthorities());
			
			// ������ ��ť��Ƽ�� ���ǿ� �����Ͽ� Authentication ��ü�� ����.
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		
		chain.doFilter(request, response);
	}
	
	
}