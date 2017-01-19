Raspberry PI Smart Home
==========
Home automation with Raspberry PI 3, Node JS & ms-gpio.js

## Pre-requisites

### Hardware Required
1. Raspberry Pi model B, with memory card preloaded with an Raspberrian OS
2. 5V 10A 2 Channel Relay Module

### Software Required
1. Node.js 
2. MS-GPIO node module
3. HTML5/Bootstrap
4. Linux/Rasbian
5. Putty, can be used for remotely connecting terminal session with Raspberry PI

### GPIO Pin & Device Mapping
1. Each device is controlled by a specific GPIO pin, hence configuration of the device and pin mapping must be done in advance
2. Current application shows a demo which can work with 4 devices, but it can be extended to more appliances
3. Mapping of 4 devices are given as follows:
   * 15: fan
   * 16: bulb
   * 18: washer
   * 19: tv
   
### Access Rights
1. Super/root user privileges

## Setup
1. Start your Raspberry PI device
2. Clone or download this project in your Raspberry PI device, for simplicity copy it on **Desktop**
   /home/pi/Desktop/HomeAutomation
3. To work with Raspberry PI pins, you need to run the node server as super user, **sudo -i** command can be used for the same
4. Assuming that the project is copied on **Desktop**. Now run the following **node index.js** command to start the node server
