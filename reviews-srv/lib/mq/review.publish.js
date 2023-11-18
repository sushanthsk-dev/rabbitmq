const constant = require("../../util/constant");
const getChannel = require("./setup");


module.exports = class ReviewPublisher {
    #routingKey;
    #exchange;
    #queue;
    constructor() {
        this.#routingKey = constant.REVIEW_ROUTING_KEY;
        this.#exchange = constant.EXCHANGE;
        this.#queue = constant.REVIEW_QUEUE_NAME;
    }
    async publish(data) {
        let channel;  
        try {
            channel = await getChannel(process.env.AMQB_LOCAL, this.#queue);

            const published = await channel.publish(this.#exchange, this.#routingKey, Buffer.from(JSON.stringify(data)))
            return published;

        } catch (error) {
            console.error("[Review]Error in publishing message", error);
        }
}
}