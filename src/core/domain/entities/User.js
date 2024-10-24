export default class User {
    constructor(id, name, phoneNumber, email = null, isPhoneVisible = false, isVerified = false, registeredVehicles = []) {
      this.id = id;
      this.name = name;
      this.phone = phoneNumber;
      this.email = email;
      this.isPhoneVisible = isPhoneVisible;
      this.isVerified = isVerified;
      this.registeredVehicles = registeredVehicles; // Array of vehicle IDs or vehicle objects
    }
  
    // Method to verify user
    verify() {
      this.isVerified = true;
    }
  
    // Method to toggle phone visibility
    togglePhoneVisibility() {
      this.isPhoneVisible = !this.isPhoneVisible;
    }
  }
  
  