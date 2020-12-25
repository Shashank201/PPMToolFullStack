package com.agileintelligence.ppmtool.payload;

public class JWTUserLoginSuccessResponse {

	private boolean success;
	private String token;

	public JWTUserLoginSuccessResponse(boolean success, String token) {
		super();
		this.success = success;
		this.token = token;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public String toString() {
		return "JWTUserLoginSuccessResponse [success=" + success + ", token=" + token + "]";
	}

}
