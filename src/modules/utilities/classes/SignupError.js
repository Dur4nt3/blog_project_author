export default class SignupError {
    constructor(formLevel, username, name, password, cpassword, key) {
        this.formLevel = formLevel;
        this.username = username;
        this.name = name;
        this.password = password;
        this.cpassword = cpassword;
        this.key = key;
    }
}