const tables = require("../tables");

// ------------------ Méthode GET ------------------
const browse = async (req, res, next) => {
  try {
    const response = await tables.user_gym.getAllUserGym();
    res.status(200).json({ data: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
    next(err);
  }
};

// ------------------ Méthode GET BY ID ------------------
const read = async (req, res, next) => {
  try {
    const response = await tables.user_gym.read(req.params.id);
    if (response == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(response);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// ------------------ Méthode POST ------------------
const add = async (req, res, next) => {
  try {
    const model = await tables.user_gym.postUserGym(req.body);
    if (!model) {
      res.sendStatus(404);
    } else {
      res.status(201).json(model);
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  add,
};

// ------------------ Méthode PUT ------------------
const edit = async (req, res, next) => {
  try {
    const response = await tables.user_gym.edit(req.params.id, req.body);
    if (response.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.status(204).json(response);
    }
  } catch (err) {
    next(err);
  }
};

// ------------------ Méthode DELETE ------------------
const destroy = async (req, res, next) => {
  try {
    const response = await tables.user_gym.delete(req.params.id);
    if (response.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { browse, read, add, edit, destroy };
