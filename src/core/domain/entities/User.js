export default class User {
  constructor(id, name, phone, email, gender, dateOfBirth, location, city,isNameVisible=true, isPhoneVisible = true, isVerified = false, registeredVehicles = []) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.location = location;
    this.city = city;
    this.isPhoneVisible = isPhoneVisible;
    this.isVerified = isVerified;
    this.isNameVisible = isNameVisible;
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
  toggleNameVisibility() {
    this.isNameVisible = !this.isNameVisible;
  }
}
