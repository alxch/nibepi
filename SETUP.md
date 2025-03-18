# socat
```sh
sudo apt-get install socat
cd nibepi
nohup socat pty,link=./COM1,raw tcp:192.168.1.131:502 </dev/null &>/dev/null &
od -x < COM1
nohup node example-nibeF.js </dev/null &>/dev/null &
tail -f /proc/<pid>/fd/1
```

# systemd
```sh
sudo nano /etc/systemd/system/nibepi.service
sudo systemctl enable nibepi.service
```
```ini
[Unit]
Description=NibePi
After=network.target

[Service]
Type=simple
SyslogIdentifier=nibepi
ExecStart=node example-nibeF.js
WorkingDirectory=/home/homecore/nibepi
User=homecore
Restart=always
RestartSec=10s

[Install]
WantedBy=multi-user.target
```

# node
```js
const mqtt = require("mqtt");
client = mqtt.connect("mqtt://localhost");
client.on("message", (topic, message) => console.log(`\x1b[32m"${topic}"\x1b[0m:`, message.toString() + ","));
client.subscribe("nibe/modbus/+/json");
client.subscribe("nibe/modbus/response/#");

client.removeAllListeners('message');
client.publish("nibe/modbus/request/info");

client.unsubscribe("nibe/modbus/40013/json");
client.publish("nibe/modbus/40013/get");
```

# mqtt
```sh
mosquitto_sub -h localhost -t nibe/modbus/# -v
mosquitto_pub -h localhost -t nibe/modbus/47260/json -m '{}'
```
```json
nibe/modbus/response/info: {
  "model":"F750","firmware":6468
}
nibe/modbus/45001/json: {
  "register":"45001","factor":1,"size":"s16","mode":"R","titel":"Alarm","info":"Indicates the alarm number of the most severe current alarm","unit":"","min":"0","max":"0","map":[{"0":"Inga larm"},{"64":"Låg frånluftstemperatur"},{"83":"Misslyckad avfrostning"},{"164":"Låg frånluftstemperatur"},{"180":"Frysskydd"},{"181":"Misslyckad periodisk höjning"},{"182":"Effektvakt aktiverad"},{"183":"Avfrostning"},{"184":"Filterlarm"},{"251":"Kom.avb Modbus"}],"data":"Misslyckad periodisk höjning","raw_data":181,"timestamp":1741627651379,"logset":false
}
```
