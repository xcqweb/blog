 var Service = require('node-windows').Service;
 
var svc = new Service({
  name:'app1',
  description: 'node js windows server',
  script: 'E:\\myblog\\app.js'
});
 
svc.on('install',function(){
  svc.start();
});
 
svc.install();