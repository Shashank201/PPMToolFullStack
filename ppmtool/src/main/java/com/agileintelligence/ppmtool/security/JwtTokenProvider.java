package com.agileintelligence.ppmtool.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.agileintelligence.ppmtool.domain.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtTokenProvider {

	// Generate Token
	public String generateToken(Authentication authentication) {
		User user = (User) authentication.getPrincipal();
		Date now = new Date(System.currentTimeMillis());

		Date expiryDate = new Date(now.getTime() + SecurityConstants.EXPIRATION_TIME);

		String userId = Long.toString(user.getId());

		Map<String, Object> claimsMap = new HashMap<>();
		claimsMap.put("id", Long.toString(user.getId()));
		claimsMap.put("username", user.getUsername());
		claimsMap.put("fullName", user.getFullName());

		return Jwts.builder().setSubject(userId).setClaims(claimsMap).setIssuedAt(now).setExpiration(expiryDate)
				.signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET).compact();
	}

	// Validate Token

	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(SecurityConstants.SECRET).parseClaimsJws(token);
			return true;
		} catch (SignatureException e) {
			System.out.println("Invalid JWT Signature");
		} catch (MalformedJwtException e) {
			System.out.println("Invalid JWT token");
		} catch (ExpiredJwtException e) {
			System.out.println("Expired JWT token");
		} catch (UnsupportedJwtException e) {
			System.out.println("Unsupported JWT token");
		} catch (IllegalArgumentException e) {
			System.out.println("JWT claims string is empty");
		}
		return false;
	}

	// Get user Id from Token
	public Long getUserIdFromJWT(String token) {
		Claims claims = Jwts.parser().setSigningKey(SecurityConstants.SECRET).parseClaimsJws(token).getBody();
		String id = (String) claims.get("id");
		return Long.parseLong(id);
	}

}
