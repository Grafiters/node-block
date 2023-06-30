class User {
  constructor(data) {
    this.email = data.email;
    this.role = data.role;
    this.google_id = data.google_id;
    this.email_verified_at = data.email_verified_at;
    this.otp_enabled = data.otp_enabled;
    this.password = data.password_digest;
    this.email_verification_token = data.email_verification_token;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  getUserLoginEntities(){
    return {
      email: this.email,
      role: this.role,
      otp_enabled: this.otp_enabled
    }
  }

  getUserRegisEntities(){
    return {
      username: this.username,
      email: this.email,
      google_id: this.google_id,
      role: this.role
    }
  }
}

module.exports = User;