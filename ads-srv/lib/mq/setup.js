const amqp = require("amqplib");
const constant = require("../../util/constant");

let channel;
/**
 * Function to setup rabbit mq
 * @async
 * @param {String} url 
 * @param {String} queueName 
 * @returns {amqp.Channel} channel
 */
const setup = async (url, queueName) => {
    const mq = await amqp.connect(url);
    const channel = await mq.createChannel();

    const exchange = constant.EXCHANGE;
    await channel.assertExchange(exchange, constant.EXCHANGE_DIRECT_TYPE, { durable: true });
    await channel.assertQueue(queueName)
    const routingKey = constant.REVIEW_ROUTING_KEY;
    await channel.bindQueue(queueName, exchange, routingKey);
    
    return channel;
}

/**
 * Function to get channel
 * @async
 * @param {String} url url
 * @param {String} queueName queue name
 * @returns 
 */
const getChannel = async (url, queueName) =>  {
    if (!channel) channel = await setup(url, queueName);
    return channel;
}

module.exports = getChannel;

