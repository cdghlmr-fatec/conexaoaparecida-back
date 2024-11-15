package com.fatec.api.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600) 
@RestController 
@RequestMapping("/api/test") 
public class TestController {

	
	@GetMapping("/public") 
	public String publicAccess() {
		return "Public Content."; 
	}

	@GetMapping("/private") 
	@PreAuthorize("hasRole('SECRETARIA') or " + 
			"hasRole('COORDENADOR') or " +
			"hasRole('ADMIN')")
	public String privateAccess() {
		return "Private Content.";
	}
}
