var nibe = require('./index');
const config = require("/etc/nibepi/config.json");

nibe.initiateCore(config.serial.host, config.serial.port, function (err, core) {
    if (err) return console.log(err);
    console.log('Core is started:', core.pid);
})
console.log('Waiting for the core to initiate...');

nibe.handleMQTT(true, config.mqtt.host, config.mqtt.port, config.mqtt.user, config.mqtt.pass, function (err, result) {
    if (err) return console.log(err);
})
console.log('Waiting for MQTT');
