// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// Maya Socket
var fs = require('fs');
var file = fs.readFileSync('maya_ls.py', 'utf-8');

var net = require('net');
var client = net.Socket();
var should_intercept_data = false;

client.connect(1337, '127.0.0.1', function() {
  console.log('Connected');
});
client.on('data', function(data) {
  if (should_intercept_data) {
    console.log('Recieved: ' + data);
    should_intercept_data = false;
  }
});
client.on('close', function() {
  console.log('Connection closed');
});

var button = document.querySelector('#command-send');
var command = document.querySelector('#command');
button.addEventListener('click', function() {
  should_intercept_data = true;
  client.write(command.value);
});

/*
import maya.cmds as cmds
items = cmds.ls()
print items
*/
