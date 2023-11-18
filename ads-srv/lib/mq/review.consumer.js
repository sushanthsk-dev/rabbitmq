const constant = require("../../../reviews-srv/util/constant");
const getChannel = require("./setup");


module.exports = class ReviewConsumer {
    #queue;
    constructor() {
        this.#queue = constant.REVIEW_QUEUE_NAME;
    }
    async consume() {
        let channel;  
        try {
            channel = await getChannel(process.env.AMQB_LOCAL, this.#queue);

            channel.consume(this.#queue, (data) => {
                console.log(`Received message: ${Buffer.from(data.content)}`);
                channel.ack(data);
            });

            process.on("SIGINT", async () => {
                await channel.close();
            });
        } catch (error) {
            console.error("[Review]Error in publishing message", error);
        }
}
}