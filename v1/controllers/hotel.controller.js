const hotelService = require("../services/hotel.service");
const messages = require("../helpers/messages");
const { query } = require("express");
const hotelCtrl = {
  handleCreate(req, res) {
    const data = req?.body;
    hotelService
      ?.create(data)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: messages?.HOTEL_CREATE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.HOTEL_CREATE_FAILED, error });
      });
  }, //handleCreate
  handleUpdate(req, res) {
    const { id } = req?.params;
    const data = req?.body;

    hotelService
      ?.update(id, data)
      .then((result) => {
        console.log("result",result);
        res
          ?.status(201)
          .send({ message: messages?.HOTEL_UPDATE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.HOTEL_UPDATE_FAILED, error });
      });
  }, //handleUpdate
  handleDelete(req, res) {
    const { id } = req?.params;
    hotelService
      ?.delete(id)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: messages?.HOTEL_DELETE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.HOTEL_DELETE_FAILED, error });
      });
  }, //handleDelete
  handleGetOne(req, res) {
    const { id } = req?.params;
    hotelService
      ?.getOne(id)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: messages?.HOTEL_FETCH_ONE_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.HOTEL_FETCH_ONE_FAILED, error });
      });
  }, //handleGetOne
  handleGetAll(req, res) {
    hotelService
      ?.getAll(req?.query)
      .then((result) => {
        res
          ?.status(201)
          .send({ message: messages?.HOTEL_FETCH_ALL_SUCCESS, data: result });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.HOTEL_FETCH_ALL_FAILED, error });
      });
  }, //handleGetAll
};

module.exports = hotelCtrl;
