module.exports = class User{
    constructor(userData) { 
        this.id = userData.id;
        this.patientcode = userData.patientcode;
        this.email = userData.email;
        this.username = userData.username;
        this.password_hash = userData.password_hash;
        this.childs_birth_day = userData.childs_birth_day;

        if (['admin', 'user'].indexOf(userData.role) > -1)
            this.role = userData.role;
        else
            this.role = 'user';
    }
}