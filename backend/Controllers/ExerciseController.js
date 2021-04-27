const Exercise = require('../Models/ExerciseModel');

const find = async (req,res) => {
    //Get all exercises  
    try{
        var exercises = await Exercise.find()

        if (exercises) 
            res.status(200).json(exercises);
            console.log("GET: all exercises complete");
    } catch (error) {
        res.status(404).json({message:error.message});
        }
    } 

    //Get that specific exercise
const findById = (req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise), console.log("GET: specific exercise complete"))
    .catch(err => res.status(400).json('Error: ' + err));
}


    //Post exercise 
const add = (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        const duration = Number(req.body.duration);
        const date = Date.parse(req.body.date);
      
        const newExercise = new Exercise({
            name,
            description,
            duration,
            date,
        });
      
        newExercise.save()
        .then(() => res.json('Exercise added!'), console.log("POST: Created a new exercise") )
        .catch(err => res.status(400).json('Error: ' + err));
      };
    
    //Edit exercise
const edit = (req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => {
        exercise.name = req.body.name;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
  
        exercise.save()
          .then(() => res.json('Exercise updated!'), console.log("PUT: Changed exercise's value"))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
}
    //Delete exercise
const Delete = (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'), console.log("DELETE: deleted a specific exercise"))
    .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = { find, add, Delete, findById, edit };