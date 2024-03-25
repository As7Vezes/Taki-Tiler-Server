export const validationPasswordRegex = (password: string) => {
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if(!regexPassword.test(password)){
        throw new Error(
            "The password must contain at least one letter and one number, and it must be equal to or greater than 6 characters."
        );
    }

    return true
}

export const validationEmailRegex = (email: string) => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!regexEmail.test(email)){
        throw new Error(
            "Invalid email format."
        );
    }
    return true
}

