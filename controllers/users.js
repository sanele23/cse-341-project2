const mongodb = require("../data/database"); // mongodb connection

// a variable that mongo will use to create uniqui identifier for each database
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  // #swagger.tags=['Users']
  const result = await mongodb.getDatabase().db().collection("users").find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getSingle = async (req, res) => {
  // #swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  // constant variable that connects to the database
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("user_info")
    .find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const createUser = async (req, res) => {
  // #swagger.tags=['Users']
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    contactDetails: req.body.contactDetails,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  // get id and update according to the user
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("user_info")
    .insertOne(user);

  // response
  if (response.acknowledge) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the user.");
  }
};

// update
const updateUser = async (req, res) => {
  // #swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  // get id and update according to the user
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("user_info")
    .replaceOne({ _id: userId }, user);

  // response
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the user.");
  }
};

// delete
const deleteUser = async (req, res) => {
  // #swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("user_info")
    .deleteUser({ _id: userId });

  // response
  if (response.deleteCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the user.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
