const restaurantService = require("../services/restaurant.service");
const messages = require("../helpers/messages");
const { query } = require("express");
const restaurantCtrl = {
  handleCreate(req, res) {
    const data = req?.body;
    restaurantService
      ?.create(data)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: messages?.RESTAURANT_CREATE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.RESTAURANT_CREATE_FAILED, error });
      });
  }, //handleCreate
  handleUpdate(req, res) {
    const { id } = req?.params;
    const data = req?.body;

    restaurantService
      ?.update(id, data)
      .then((result) => {
        console.log("result", result);
        res
          ?.status(201)
          .send({ message: messages?.RESTAURANT_UPDATE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.RESTAURANT_UPDATE_FAILED, error });
      });
  }, //handleUpdate
  handleDelete(req, res) {
    const { id } = req?.params;
    restaurantService
      ?.delete(id)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: messages?.RESTAURANT_DELETE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.RESTAURANT_DELETE_FAILED, error });
      });
  }, //handleDelete
  handleGetOne(req, res) {
    const { id } = req?.params;
    restaurantService
      ?.getOne(id)
      .then((result) => {
        res
          ?.status(201)
          .send({
            message: messages?.RESTAURANT_FETCH_ONE_SUCCESS,
            data: result,
          });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.RESTAURANT_FETCH_ONE_FAILED, error });
      });
  }, //handleGetOne
  handleGetAll(req, res) {
    restaurantService
      ?.getAll(req?.query)
      .then((result) => {
        res
          ?.status(201)
          .send({
            message: messages?.RESTAURANT_FETCH_ALL_SUCCESS,
            data: result,
          });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.RESTAURANT_FETCH_ALL_FAILED, error });
      });
  }, //handleGetAll
};

module.exports = restaurantCtrl;
