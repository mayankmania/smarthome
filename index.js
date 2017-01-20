var express = require('express');
var bodyParser = require('body-parser');
var gpioInstance = require('ms-gpio');

//Define gpioPath to simulate raspberry on local machine, leave it blank if you are running it on Raspberry device
var gpioPath = "test";
var gpio = new gpioInstance(gpioPath);
var app = new express();

startUp();

//Listen for all the request
var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    console.log('Server running on port ' + port);
});

//Register all the startup related stuffs in this function
function startUp() {
    configureExternalModule();
    setUpHttpHandler();
    app.set('port', 9000);
}

//Configure external modules here
function configureExternalModule() {
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    var options = {
        index: "index.htm"
    };

    app.use('/', express.static('public', options));
}

//Configure http request handler
function setUpHttpHandler() {
    app.use('/getDevices', function (req, res) {
        var devices = getRegisteredDevices();
        for (var i = 0; i < devices.length; i++) {
            var status = gpio.read(devices[i].deviceId);
            if (status == -1) {
                status = 0;
            }
            devices[i].status = status;
        }
        res.json(devices);
    });

    app.post("/", function (req, res) {
        var deviceId = req.body.deviceId;
        gpio.setUp(deviceId, "out");
        var currentLEDStatus = gpio.read(deviceId);
        if (currentLEDStatus == 0 || currentLEDStatus == -1) {
            setApplianceState(deviceId, 1, res);
        }
        else {
            setApplianceState(deviceId, 0, res);
        }
    });
}

//Set appliance state
function setApplianceState(pinNo, setState, response) {
    gpio.write(pinNo, setState);
    var jsonResult = { "status": setState, "deviceId": pinNo };
    response.json(jsonResult);
}

//Hard coded list of devices, ideally it should come from API/Database
function getRegisteredDevices() {
    var devices = [
        {
            deviceId: 15, status: 0, device: "fan"
        },
        {
            deviceId: 16, status: 0, device: "bulb"
        },
        {
            deviceId: 18, status: 0, device: "washer"
        },
        {
            deviceId: 19, status: 0, device: "tv"
        }
    ];
    return devices;
}
