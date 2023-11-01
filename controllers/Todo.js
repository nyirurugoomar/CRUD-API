const Todo = require("../model/Todo.js");

//get
const getTodos = (req, res) => {
  Todo.find()
    .then((todos) => {
      res.json(todos);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
//post
const createTodo = async (req, res) => {
    const { title, description, completed } = req.body;

    try {
        const todo = new Todo({
            title,
            description,
            completed,
        });

        const savedTodo = await todo.save();
        res.json(savedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//update  //put

const updateTodo = (req, res) => {
  Todo.findOneAndUpdate(
    { _id: req.params.todoID },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
      },
    },
    { new: true }
  )
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(updatedTodo);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

//delete

const deleteTodo = (req, res) => {
  Todo.deleteOne({ _id: req.params.todoID })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json({ message: "Todo Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};






module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};
