const mongodb = require("../data/database"); // mongodb connection

// a variable that mongo will use to create uniqui identifier for each database
const ObjectId = require("mongodb").ObjectId;

// add validation and error handling
const getAll = async (req, res) => {
  try {
    // #swagger.tags=['Users']
    const result = await mongodb.getDatabase().db().collection("user_info").find();
    const users = await result.toArray();

    if (!Array.isArray(users)) {
      throw new Error("Invalid data received from the database");
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
};


const getSingle = async (req, res) => {
  try {
    // #swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("user_info")
      .find({ _id: userId });

    const users = await result.toArray();

    if (!Array.isArray(users) || users.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user" });
  }
};


const createUser = async (req, res) => {
  try {
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

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("user_info")
      .insertOne(user);

    if (response.acknowledged) {
      res.status(204).send();
    } else {
      throw new Error("User insertion failed");
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// update
const updateUser = async (req, res) => {
  try {
    // #swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      contactDetails: req.body.contactDetails,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("user_info")
      .replaceOne({ _id: userId }, user);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      throw new Error("User update failed");
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// delete
const deleteUser = async (req, res) => {
  try {
    // #swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("user_info")
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      throw new Error("User deletion failed");
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
