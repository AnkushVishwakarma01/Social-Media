class Session {
    constructor(){
        id: '';
        name: '';
        email: '';
        phone_number: '';
        country: '';
    }
    start(obj){
        this.id = obj._id;
        this.name = obj.Name;
        this.email = obj.Email;
        this.phone_number = obj.Phone_Number;
        this.country = obj.Country;
    }

    destroy(){
        this.id = '';
        this.name = '';
        this.email = '';
        this.phone_number = '';
        this.country = '';
    }
}

module.exports = {Session};