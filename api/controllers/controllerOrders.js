'use stric';

const Orders = require('../models/modelOrders');

async function postOrder (req, res) {
  const order = req.body;
  const orders = new Orders(order);

  try {
    const data = await orders.save();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function getOrders (req, res) {
  try {
    const data = await Orders.find()
      .populate('familyId')
      .populate('itemId')
      .populate('userId')
      .exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function getOrdersOpen (req, res) {
  try {
    const data = await Orders.find({ buyed: false })
      .populate('familyId')
      .populate('itemId')
      .populate('userId')
      .exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function getOrder (req, res) {
  const orderId = req.params.id;

  try {
    const data = await Orders.findById(orderId)
      .populate('familyId')
      .populate('itemId')
      .populate('userId')
      .exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

async function deleteOrder (req, res) {
  const orderId = req.params.id;

  try {
    const data = await Orders.findByIdAndDelete(orderId);

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ data: 'ko' });
  }
}

function putOrders (req, res) {
  const dataReq = req.body;

  try {
    /*
    const dataUpdate = [];

    dataReq.forEach(element => {
      dataUpdate.push({
        _id: element._id,
        familyId: element.familyId._id,
        itemId: element.itemId._id,
        userId: element.userId._id,
        model: element.model,
        quantity: element.quantity,
        buyed: element.buyed,
        dateOrder: element.dateOrder,
        datePurchase: element.datePurchase
      });
    });
    */

    dataReq.forEach(async element => {
      await Orders.findByIdAndUpdate(element._id, element, { new: true });
    });

    // const data = await Orders.updateMany({ }, dataUpdate);

    res.status(200).send({ data: 'ok' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ data: 'ko' });
  }
}

module.exports = { postOrder, getOrders, getOrdersOpen, getOrder, deleteOrder, putOrders };
