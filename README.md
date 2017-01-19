Raspberry PI Smart Home
==========
Home automation with Raspberry PI 3, Node JS & ms-gpio.js

## SetUp

### Hardware
1. Raspberry Pi model B, with memory card preloaded with an Raspbian OS
2. 5V 10A 2 Channel Relay Module
3. Circuit creation, each device will controlled by a specific GPIO pin & a relay switch2. You need to create a cicuit keeping the main current passing as in input, with output coming from relay swtich to the device

##### Default GPIO Pin & device Mapping
1. Each device is controlled by a specific GPIO pin, hence configuration of the device and pin mapping must be done in advance
2. Current application shows a demo which can work with 4 devices, but it can be extended to more appliances
3. Mapping of 4 devices are given as follows:
 * 15 : fan
 * 16 : bulb
 * 18 : washer
 * 19 : tv

### Software
1. Node.js 
2. MS-GPIO node module
3. HTML5/Bootstrap
4. Linux/Rasbian
5. Putty, can be used for remotely connecting terminal session with Raspberry PI
 
### Access Rights
1. Super/root user privileges

## Running the project
1. Start your Raspberry PI device
2. Clone or download this project in your Raspberry PI device, for simplicity copy it on **Desktop**
   /home/pi/Desktop/HomeAutomation
3. To work with Raspberry PI pins, you need to run the node server as super user, **sudo -i** command can be used for the same
4. Assuming that the project is copied on **Desktop**. Now run the following **node index.js** command to start the node server
5. After navigating to the folder run **node index.js** command to start the node server. This will start the server to run on 9000 port
6. Navigate to the browser hit localhost:9000, it should present a HTML based UI which can be used for controlling the home appliances 
