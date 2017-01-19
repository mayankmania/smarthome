Raspberry PI Smart Home
==========
Home automation with Raspberry PI 3, Node JS & ms-gpio.js

## Pre-requisites
### Hardware Required
1. Raspberry Pi model B, with memory card preloaded with an Raspberrian OS.2.5V 10A
2. Channel Relay Module.Software (Programming languages and OS  involved):

### Software Required
1. Node Server
2. ms-gpio node module
3. HTML5/Bootstrap
4. Linux/Rasbian
5. Super user previledges

## Setup
1. Start your Raspberry PI device
2. Clone or download this project in your Raspberry PI device, for simplicity copy it on **Desktop**.
   /home/pi/Desktop/HomeAutomation
3. To work with Raspberry you need to run the node server as super user,run **sudo -i** command on terminal
4. Assuming that the project is copied on **Desktop**. Now run the following **node index.js** command to start the node server
    
## Usage
Firstly, make make sure you are running your application as root or with sudo, else the Raspberry Pi will not let you output to the GPIO.

Before you can read or write, you must use setup() to open a channel, and must specify whether it will be used for input or output. Having done this, you can then read in the state of the channel or write a value to it using read() or write().

Please note that there are two different and confusing ways to reference a channel; either using the Raspberry Pi or the BCM/SoC naming schema (sadly, neither of which match the physical pins!). This module supports both schemas, with Raspberry Pi being the default. Please see [this page](http://elinux.org/RPi_Low-level_peripherals) for more details.
