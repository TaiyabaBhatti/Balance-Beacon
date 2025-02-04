export const validatePassword = (password) =>{

// According to firebase password rules
console.log("Entered")
    const minLength = 6;
    const maxLength = 30;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);

    if (password.length < minLength || password.length > maxLength) {
      return `Password must be between ${minLength} and ${maxLength} characters.`;
    }
    if (!hasLowercase) return "Password must include at least one lowercase letter.";
    if (!hasUppercase) return "Password must include at least one uppercase letter.";
    if (!hasNumber) return "Password must include at least one numeric character.";
    if (!hasSpecialChar) return "Password must include at least one special character.";

    return null; // Valid password

}