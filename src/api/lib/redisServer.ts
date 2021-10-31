import redis from "redis";
const client =  redis.createClient(
    parseInt(String(process.env.REDIS_PORT || 6379)),
    process.env.REDIS_HOST || 'localhost'
);

client.on('error', function(err:any) {
    console.log('Error, redis is not running', err);
});

client.on('ready', function() {
    console.log('redis is running');
});

//
 export default client;