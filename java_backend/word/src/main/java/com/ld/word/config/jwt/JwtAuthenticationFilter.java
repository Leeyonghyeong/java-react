package com.ld.word.config.jwt;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ld.word.config.auth.PrincipalDetail;
import com.ld.word.model.User;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
	
	private final AuthenticationManager authenticationManager;
	

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		// TODO Auto-generated method stub
		System.out.println("JwtAuthenticationFilter : �α��� �õ���");
		

		try {
			ObjectMapper om = new ObjectMapper();
			User user = om.readValue(request.getInputStream(), User.class);
			System.out.println("JwtAuthenticationFilter -> " + user); 
			
			UsernamePasswordAuthenticationToken authenticationToken = 
					new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
			

			Authentication authentication = 
					authenticationManager.authenticate(authenticationToken);
			

			PrincipalDetail principalDetail = (PrincipalDetail) authentication.getPrincipal();
			System.out.println("�α��� �Ϸ�� : " + principalDetail.getUser().getUsername());

			return authentication;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return null;
	}
	

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		// TODO Auto-generated method stub
		System.out.println("successfulAuthentication ����� : ���� �Ϸ�");
		
		PrincipalDetail principalDetail = (PrincipalDetail) authResult.getPrincipal();
		

		String jwtToken = JWT.create()
				.withSubject("ACCESS_TOKEN")
				.withExpiresAt(new Date(System.currentTimeMillis() + (1000 * 60 * 60 * 24 * 365)))
				.withClaim("id",  principalDetail.getUser().getId())
				.withClaim("username", principalDetail.getUser().getUsername())
				.sign(Algorithm.HMAC256("mySecretKey"));
		
		Cookie cookie = new Cookie("access_token", jwtToken);
		cookie.setMaxAge(60 * 60 * 24 * 365); 
		cookie.setPath("/");
		
		//response.addHeader("ACCESS_TOKEN", "Bearer " + jwtToken);
		response.addCookie(cookie);
		
		PrintWriter writer = response.getWriter();
		
		writer.println(principalDetail.getUser().getId());
		
	}
}
