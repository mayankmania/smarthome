var express = require('express');
var bodyParser = require('body-parser');
var gpio = require('ms-gpio');
var app = new express();

startUp();

//Listen for all the request
var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    console.log('Server running on port ' + port);
});

//Register all the startup related stuffs in this function
function startUp() {
    gpio.GPIO_Path = "test"; //Comment it out if used in Raspberry device
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
            gpio.setup(devices[i].deviceId);
            devices[i].status =  gpio.read(devices[i].deviceId);
        }
        res.json(devices);
    });

    app.post("/", function (req, res) {
        var deviceId = req.body.deviceId;
        //gpio.setup(deviceId, gpio.OUTPUT_MODE);
        setApplianceState(deviceId, !gpio.read(deviceId), res);
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
            deviceId: 15, status: false, device: "fan"
        },
        {
            deviceId: 16, status: false, device: "bulb"
        },
        {
            deviceId: 18, status: false, device: "washer"
        },
        {
            deviceId: 19, status: false, device: "tv"
        }
    ];
    return devices;
}
