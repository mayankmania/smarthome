Raspberry PI Smart Home
==========
Home automation with Raspberry PI 3, Node JS & ms-gpio.js

## Setup
See this guide on how to get [node.js running on Raspberry Pi](https://learn.adafruit.com/node-embedded-development/installing-node-dot-js).

## Usage
Firstly, make make sure you are running your application as root or with sudo, else the Raspberry Pi will not let you output to the GPIO.

Before you can read or write, you must use setup() to open a channel, and must specify whether it will be used for input or output. Having done this, you can then read in the state of the channel or write a value to it using read() or write().

Please note that there are two different and confusing ways to reference a channel; either using the Raspberry Pi or the BCM/SoC naming schema (sadly, neither of which match the physical pins!). This module supports both schemas, with Raspberry Pi being the default. Please see [this page](http://elinux.org/RPi_Low-level_peripherals) for more details.

## API

### Methods

#### setup(pinNo, direction)
Sets up a pin for read or write. Must be done before the channel can be used.
* pinNo: Reference to the GPIO pin.
* direction: The pin direction, pass either InputMode for read mode or OutputMode for write mode. Defaults to OutputMode.

#### read(pinNo)
Reads the value of a channel.
* pinNo: Reference to the GPIO pin.

#### write(pinNo, value)
Writes the value of a channel.
* pinNo: Reference to the GPIO pin.
* value: int value to specify whether the channel will turn on or off.

## Examples

### Setup and read the value of a pin
```js
var gpio = require('ms-gpio');

gpio.setup(7, gpio.DIR_IN, readInput);

function readInput() {
    gpio.read(7, function(err, value) {
        console.log('The value is ' + value);
    });
}
```

### Setup and write to a pin
```js
var gpio = require('rpi-gpio');

gpio.setup(7, gpio.DIR_OUT, write);

function write() {
    gpio.write(7, true, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
}
```

### Unexport pins opened by the module when finished
```js
var gpio = require('../rpi-gpio');

gpio.on('export', function(channel) {
    console.log('Channel set: ' + channel);
});

gpio.setup(7, gpio.DIR_OUT);
gpio.setup(15, gpio.DIR_OUT);
gpio.setup(16, gpio.DIR_OUT, pause);

function pause() {
    setTimeout(closePins, 2000);
}

function closePins() {
    gpio.destroy(function() {
        console.log('All pins unexported');
    });
}
```


### Voltage cycling a pin
This example shows how to set up a channel for output mode. After it is set up, it executes a callback which in turn calls another, causing the voltage to alternate up and down three times.
```js
var gpio = require('rpi-gpio');

var pin   = 7;
var delay = 2000;
var count = 0;
var max   = 3;

gpio.setup(pin, gpio.DIR_OUT, on);

function on() {
    if (count >= max) {
        gpio.destroy(function() {
            console.log('Closed pins, now exit');
        });
        return;
    }

    setTimeout(function() {
        gpio.write(pin, 1, off);
        count += 1;
    }, delay);
}

function off() {
    setTimeout(function() {
        gpio.write(pin, 0, on);
    }, delay);
}
```

### Using flow control modules
Due to the asynchronous nature of this module, using an asynchronous flow control module can help to simplify development. This example uses [async.js](https://github.com/caolan/async) to turn pins on and off in series.
```js
var gpio = require('rpi-gpio');
var async = require('async');

async.parallel([
    function(callback) {
        gpio.setup(7, gpio.DIR_OUT, callback)
    },
    function(callback) {
        gpio.setup(15, gpio.DIR_OUT, callback)
    },
    function(callback) {
        gpio.setup(16, gpio.DIR_OUT, callback)
    },
], function(err, results) {
    console.log('Pins set up');
    write();
});

function write() {
    async.series([
        function(callback) {
            delayedWrite(7, true, callback);
        },
        function(callback) {
            delayedWrite(15, true, callback);
        },
        function(callback) {
            delayedWrite(16, true, callback);
        },
        function(callback) {
            delayedWrite(7, false, callback);
        },
        function(callback) {
            delayedWrite(15, false, callback);
        },
        function(callback) {
            delayedWrite(16, false, callback);
        },
    ], function(err, results) {
        console.log('Writes complete, pause then unexport pins');
        setTimeout(function() {
            gpio.destroy(function() {
                console.log('Closed pins, now exit');
            });
        }, 500);
    });
};

function delayedWrite(pin, value, callback) {
    setTimeout(function() {
        gpio.write(pin, value, callback);
    }, 500);
}
```

## Contributing
Contributions are appreciated, both in the form of bug reports and pull requests.

Due to the nature of this project it can be quite time-consuming to test against real hardware, so the automated test suite is all the more important. I will not accept any pull requests that cause the build to fail, and probably will not accept any that do not have corresponding test coverage.

You can run the tests with npm:
```
npm test
```
and create a coverage report with:
```
npm run coverage
```
There is also an integration test that you can run on Raspberry Pi hardware, having connected two GPIO pins across a resistor. The command to run the test will provide further instructions on how to set up the hardware:
```
npm run int
```

The tests use [mochajs](http://mochajs.org) as the test framework, and [Sinon.JS](http://sinonjs.org) to stub and mock out file system calls.
