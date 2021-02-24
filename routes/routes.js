import express from "express";
import IndexController from "../controller/indexController.js";
var router = express.Router();
var indexControler = new IndexController();
/* GET home page. */

router.get("/", indexControler.index);

router.post("/ecuation", indexControler.ecuationSolve);
router.post("/ecuationimg", indexControler.ecuationSolveImg);
router.post("/plus", indexControler.plus);
export default router;

 