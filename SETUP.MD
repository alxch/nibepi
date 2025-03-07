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
ExecStart=sh -c "socat -dd pty,link=COM1,raw tcp:192.168.1.131:502 & node example-nibeF.js"
WorkingDirectory=/home/homecore/nibepi
User=homecore
Restart=always
RestartSec=10s

[Install]
WantedBy=multi-user.target
```
