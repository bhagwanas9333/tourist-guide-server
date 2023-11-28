const placeService = require("../services/place.service");
const messages = require("../helpers/messages");
const { query } = require("express");
const placeCtrl = {
  handleCreate(req, res) {
    const data = req?.body;
    placeService
      ?.create(data)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: messages?.PLACE_CREATE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.PLACE_CREATE_FAILED, error });
      });
  }, //handleCreate
  handleUpdate(req, res) {
    const { id } = req?.params;
    const data = req?.body;
    placeService
      ?.update(id, data)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: messages?.PLACE_UPDATE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.PLACE_UPDATE_FAILED, error });
      });
  }, //handleUpdate
  handleDelete(req, res) {
    const { id } = req?.params;
    placeService
      ?.delete(id)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: messages?.PLACE_DELETE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.PLACE_DELETE_FAILED, error });
      });
  }, //handleDelete
  handleGetOne(req, res) {
    const { id } = req?.params;
    placeService
      ?.getOne(id)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: messages?.PLACE_FETCH_ONE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.PLACE_FETCH_ONE_FAILED, error });
      });
  }, //handleGetOne
  handleGetAll(req, res) {
    placeService
      ?.getAll(req?.query)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: messages?.PLACE_FETCH_ALL_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.PLACE_FETCH_ALL_FAILED, error });
      });
  }, //handleGetAll
};

module.exports = placeCtrl;
