import mongoose from "../connection/connect.js";
import modelenum from "../utils/enumModel.js";
import RolesModel from "./rolesModel.js";

class UserModel{
    constructor(){
        var roles = new RolesModel();
        this.Schema = mongoose.Schema;
        this.UserSchema = new this.Schema({
            name: String,
            lastname: String,
            email: {
                type: String,
                validate: {
                    validator: (value) => {
                        return /^[\w\.]+@[\w\.]+\.\w{2,3}$/g.test(value);
                     },
                    message: (props) => `Este email de nombre ${props.value} es invalido`,
                },
            },
            password: String,
            registerDate: Date,
            age: {
                type: Number,
                min: 18,
            },
            roles: [roles.getSchema()],
        });
        //this.mymodel = mongoose.model("users", this.UserSchema);
        if(modelenum["users"] == null){
            this.mymodel = mongoose.model("users", this.UserSchema);
            modelenum["users"] = this.mymodel;
        }
        else{
            this.mymodel = modelenum["users"];
        }
    }
    // CRUD "C" DE CREATE
    createUser(name, lastname, email, password, registerDate, age){
        var user = {
            name,
            lastname,
            email,
            password,
            registerDate,
            age,
            roles: [],
        }
        var newuser = new this.mymodel(user);
        var error = newuser.validateSync();
        
        return new Promise((resolve, reject) => {
            if(error){
                resolve(error);
                return
            }
            newuser.save().then((err, docs) => {
                if (err) {
                    resolve(err);
                    return;
                }
                console.log("usuario registrado");
                resolve(docs);
            });
        });
    }
// CRUD "R" DE READ
    /*async getUsers(){
        return await this.mymodel.find({});
    }*/
    getUsers(){
        return new Promise((resolve, reject) => {
            this.mymodel.find({}, (err, docs) => {
                if(err){
                    console.log(err);
                    resolve(err);
                    return;
                }
                resolve(docs);
            });
        });
    }

// CRUD "u" DE UPDATE
    updateUsers(id, userUpdate) {
        return new Promise((resolve, reject) => {
            this.mymodel.update({ _id: id}, {$set: userUpdate}, (err, docs) => {
                if (err){
                    console.log(err);
                    resolve(err);
                    return;
                }
                resolve(docs);
            });
        });
    }
// CRUD "D" DE DELETE
    deleteUser(id){
        return new Promise((resolve, reject) => {
            this.mymodel.remove({ _id: id}).then((err, docs) => {
                if (err){
                    console.log(err);
                    resolve(err);
                    return;
                }
                resolve(docs);
            });
        });
        
    }

    getModel() {
        return this.mymodel;
    }
    getSchema() {
        return this.UserSchema;
    }
    async  checkEmaildb(email) {
        var result = await this.mymodel.find({email: email});
        if(result.length > 0){
            return true;
        }
        return false;
    }
    async addRol(id, rol){
       var result = await this.mymodel.update(
           { _id: id }, 
           { $push: {roles: rol} }
        ); 
        return(result);
    }
}
export default UserModel;