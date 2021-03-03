import express from "express";
import IndexController from "../controller/indexController.js";
import UserController from "../controller/userController.js";
import RolesController from "../controller/rolesController.js";

var router = express.Router();
var indexControler = new IndexController();
var usercontroller = new UserController();
var rolescontroller = new RolesController();
/* GET home page. */

router.get("/", indexControler.index);
router.get("/user", usercontroller.getUsers);
router.post("/user", usercontroller.createUser);
router.put("/user/:id", usercontroller.updateUsers);
router.delete("/user/:id", usercontroller.deleteUsers);
router.post("/addRol", usercontroller.addRol);
//////

router.post("/roles", rolescontroller.createRol);
router.get("/roles", rolescontroller.getRol);
router.get("/roles/:key", rolescontroller.getRol);
router.put("/roles/:id", rolescontroller.updateRol);
router.delete("/roles/:id", rolescontroller.deleteRol);
export default router;

 