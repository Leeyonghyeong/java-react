package com.ld.word.config.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ld.word.model.User;
import com.ld.word.repository.UserRepository;

import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class PrincipalDetailService implements UserDetailsService{
	
	private final UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		System.out.println("PrincipalDetailService�� loadUserByUsername()");
		System.out.println("PrincipalDetailService�� username : " + username);
		User user = userRepository.findByUsername(username);
		System.out.println("user -------> : " + user);
		
		
		if (user == null)
		{
			
			System.out.println("loadUserByUsername : not existed user");
			throw new UsernameNotFoundException("login fail");
		}
		
		return new PrincipalDetail(user);			
		
	}
}
