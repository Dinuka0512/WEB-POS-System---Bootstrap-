export class Validation {
    
    static isNameValid(name) {
        return /^[A-Za-z.]+$/.test(name);
    }

    static isEmailValid(email) {
        return /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    static isContactValid(contact) {
        return /^\d{10}$/.test(contact);
    }
    
    // Add more methods as needed
}
