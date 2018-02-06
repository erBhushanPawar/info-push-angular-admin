var redis = require("redis");
var redisCli = redis.createClient();


redisCli.on("error", function (err) {
    console.log("Error " + err);
});

function setInterest(queryParam) {

}


/*  redisCli.set("string key", "string val", redis.print);
redisCli.hset("hash key", "hashtest 1", "some value", redis.print);
redisCli.hset(["hash key", "hashtest 2", "some other value"], redis.print);
redisCli.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    redisCli.quit();
});
 */
console.log("## REDIS ## Started")