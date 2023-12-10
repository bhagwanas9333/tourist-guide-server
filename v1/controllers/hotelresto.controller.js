const hotelrestoService = require("../services/hotelresto.service");
const messages = require("../helpers/messages");
const { query } = require("express");

const hotelrestoCtrl = {
  handleCreate(req, res) {
    const data = req?.body;
    hotelrestoService
      ?.create(data)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: messages?.HOTELRESTO_CREATE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.HOTELRESTO_CREATE_FAILED, error });
      });
  }, //handleCreate
  handleUpdate(req, res) {
    const { id } = req?.params;
    const data = req?.body;

    hotelrestoService
      ?.update(id, data)
      .then((result) => {
        console.log("result",result);
        res
          ?.status(201)
          .send({ message: messages?.HOTELRESTO_UPDATE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.HOTELRESTO_UPDATE_FAILED, error });
      });
  }, //handleUpdate
  handleDelete(req, res) {
    const { id } = req?.params;
    hotelrestoService
      ?.delete(id)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: messages?.HOTELRESTO_DELETE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.HOTELRESTO_DELETE_FAILED, error });
      });
  }, //handleDelete
  handleGetOne(req, res) {
    const { id } = req?.params;
    hotelrestoService
      ?.getOne(id)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: messages?.HOTELRESTO_FETCH_ONE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.HOTELRESTO_FETCH_ONE_FAILED, error });
      });
  }, //handleGetOne
  handleGetAll(req, res) {
    hotelrestoService
      ?.getAll(req?.query)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: messages?.HOTELRESTO_FETCH_ALL_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.HOTELRESTO_FETCH_ALL_FAILED, error });
      });
  }, //handleGetAll
};

module.exports = hotelrestoCtrl;
