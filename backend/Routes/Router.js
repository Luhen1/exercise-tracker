const express = require('express');
const router = express.Router();

//controllers
const UserController = require('../Controllers/UserController');
const ExerciseController = require('../Controllers/ExerciseController');


//GET
router.get("/auth/logout", UserController.logout);
router.get("/auth/loggedIn", UserController.loggedIn);

router.get("/exercises", ExerciseController.find);
router.get("/exercises/:id", ExerciseController.findById);

// POST
router.post("/auth/register", UserController.register);
router.post("/auth/login", UserController.login);

router.post("/exercises/add", ExerciseController.add); 

//PUT
router.put("/exercises/:id", ExerciseController.edit);

//DELETE
router.delete("/exercises/:id", ExerciseController.Delete); 

module.exports = router;