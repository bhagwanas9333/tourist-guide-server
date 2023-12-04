const userService = require("../services/user.service");
const message = require("../helpers/messages");
const { date } = require("joi");
const userCtrl = {
  handleCreate(req, res) {
    const data = req?.body;
    userService
      ?.create(data)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: message?.USER_CREATED_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res?.status(500).send({ message: message?.USER_CREATED_FAILED, error });
      });
  }, //handleCreate
  handleUpdate(req, res) {
    const { id } = req?.params;
    const data = req?.body;
    userService
      ?.update(id, data)
      .then((result) => {
        res
          ?.status(200)
          .send({ message: message.USER_UPDATE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res?.status(500).send({ message: message?.USER_UPDATE_FAILED, error });
      });
  }, //handleUpdate
  handleDelete(req, res) {
    const { id } = req?.params;
    userService
      ?.delete(id)
      .then((result) => {
        res
          ?.status(200)
          .send({ message: message?.USER_DELETE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res?.status(500).send({ message: message?.USER_DELETE_FAILED, error });
      });
  }, //handleDelete
  handleGetOne(req, res) {
    const { id } = req?.params;
    userService
      ?.getOne(id)
      .then((result) => {
        res
          ?.status(200)
          .send({ message: message?.USER_FETCH_ONE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        req
          ?.status(500)
          .send({ message: message?.USER_FETCH_ONE_FAILED, error });
      });
  }, //handleGetOne
  handleGetAll(req, res) {
    const query = req?.query;
    userService
      ?.getAll(query)
      .then((result) => {
        res
          ?.status(200)
          .send({ message: message?.USER_FETCH_ALL_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: message?.USER_FETCH_ALL_FAILED, error });
      });
  }, //handleGetAll
};

module.exports = userCtrl;
