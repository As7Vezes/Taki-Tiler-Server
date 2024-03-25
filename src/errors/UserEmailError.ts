export class UserExistEmailError extends Error {
    constructor () {
        super("User alredy exists with same email.")
    }
} 