const hotelrestoService = require("../services/hotelresto.service");
const messages = require("../helpers/messages");
const { query } = require("express");
const { createTransportering } = require("../helpers/hoterestoEmail");

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
        console.log("result", result);
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
        res?.status(201).send({
          message: messages?.HOTELRESTO_FETCH_ONE_SUCCESS,
          data: result,
        });
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
        res?.status(201).send({
          message: messages?.HOTELRESTO_FETCH_ALL_SUCCESS,
          data: result,
        });
      })
      .catch((error) => {
        console.error(error);
        res
          ?.status(500)
          .send({ message: messages?.HOTELRESTO_FETCH_ALL_FAILED, error });
      });
  }, //handleGetAll

  async handleBookNow(req, res) {
    const {
      email,
      name,
      dateTime,
      rooms,
      table,
      specialRequest,
      type,
      subject,
      message,
    } = req.body;
    console.log("email", email);

    try {
      // send email
      const to = email;
      const from = "bhagwan9282@gmail.com";
      subject ? "Submit Form for Book Now in Trip Tastic" : subject;
      message ? "Please enter your message" : message;
      const text = `Dear Customer,
        Your Form is submitted.
        `;

        const html = `
        <p>Dear Customer,</p>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        ${!subject ? `<p>Type: ${type}</p>
         <p>Date & Time: ${dateTime}</p>
         ${type == "hotel" ? `<p>Room: ${rooms}</p>` : `<p>Table: ${table}</p>`}
         <p>Special Request: ${specialRequest}</p>`
        :
         `<p>Subject: ${subject}</p>
         <p>Message: ${message}</p>`
        }
      `;
      const transporter = createTransportering();

      // Send email
      transporter.sendMail(
        {
          from,
          to,
          subject,
          text,
          html,
        },
        (error, emailResult) => {
          if (error) {
            console.error("Error sending email:", error);
            res.status(500).send({ message: "Error sending email", error });
          } else {
            // console.log("Email sent:", emailResult);
            res.status(200).send({ message: "Email sent", data: emailResult });
          }
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error generating reset link", error });
    }
  }, //handleBookNow
};

module.exports = hotelrestoCtrl;
