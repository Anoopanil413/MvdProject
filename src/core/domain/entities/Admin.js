export default class Admin {
    constructor(id, username, password, isVerified = false) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.isVerified = isVerified;
    }
  
    validatePassword(plainPassword) {
      return this.password === plainPassword; 
    }
  
    // Method to verify admin
    verify() {
      this.isVerified = true;
    }
  }
  
  