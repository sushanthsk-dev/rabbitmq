const express = require("express");
const amqp = require("amqplib");
const constant = require("./util/constant");
const ReviewConsumer = require("./lib/mq/review.consumer");


const app = express();

// const reviewConsumer = new ReviewConsumer();
// reviewConsumer.consume();

module.exports = app;