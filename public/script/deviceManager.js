$(document).ready(function () {
    $.ajaxSetup({ cache: false });
    getDevices();
});

function getDevices() {
    $.get("/getDevices")
    .done(function (result) {
        for (var i = 0; i < result.length; i++) {
            $("table tbody").append("<tr><th scope='row'>" + (i + 1) + "</th><td><img src='css/icons/" + result[i].device + ".png'" + " class='thumbnail' alt='...'></td><td><a href='javascript:void(0);' onclick='manageDevice(" + result[i].deviceId + ")'><img class='thumbnail' src='css/icons/stop.png' id='device" + result[i].deviceId + "'/> </a></td></tr>");
            setStateIcon(result[i]);
        }
    });
}

function manageDevice(deviceId) {
    $.post("/", { "deviceId": deviceId })
    .done(function (result) {
        setStateIcon(result);
    });
}

function setStateIcon(result) {
        $("#device" + result.deviceId).attr('src', result.status ? 'css/icons/stop.png' : 'css/icons/start.png');
}