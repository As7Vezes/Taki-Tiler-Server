export const regexPassword = (password: string) => {
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if(!regexPassword.test(password)){
        throw new Error(
            "A senha deve conter no mínimo uma letra e um número e deve ser igual ou maior que 6 caracteres"
        );
    }

    return true
}

export const regexEmail = (email: string) => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!regexEmail.test(email)){
        throw new Error(
            "Formato de email inválido"
        );
    }
    return true
}

