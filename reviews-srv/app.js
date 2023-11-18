const express = require("express");
const amqp = require("amqplib");
const constant = require("./util/constant");
const ReviewPublisher = require("./lib/mq/review.publish");

const app = express();

const reviewPublisher = new ReviewPublisher();

app.use(express.json());
app.get("/send-msg", async (req, res) => {
    
    // data to be sent
    const data = {
        title  : "El dorado",
        review : "Bun :)"
    }
    // sendData(data);  // pass the data to the function we defined
    console.log("A message is sent");
    await reviewPublisher.publish(data);
    res.send("Message Sent"); //response to the API request
    
})

module.exports = app;1