import UserModel from "../models/userModel.js";
var inittest = async () => {
     var usermodel =  new UserModel();
     /*usermodel.createUser("test1","test 1 lastname", "test1@gmail.com", "1234", new Date(), 15);
     usermodel.createUser("test2","test 2 lastname", "test2@gmail.com", "1234", new Date(), 13);
     usermodel.createUser("test3","test 3 lastname", "test3@gmail.com", "1234", new Date(), 14);
     usermodel.createUser("test4","test 4 lastname", "test4@gmail.com", "1234", new Date(), 16);
     console.log(await usermodel.getUsers());*/
     
     //usermodel.deleteUser("id");
     //console.log(await usermodel.getUsers());

     //await usermodel.updateModel("id", {name:"ramon"});
     //console.log(await usermodel.getUsers());
}

inittest();