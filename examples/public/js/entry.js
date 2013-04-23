require.define("/entry", function (require, module, exports, __dirname, __filename){

window.ss = require('socketstream');

ss.server.on('disconnect', function() {
  return console.log('Connection down :-(');
});

ss.server.on('reconnect', function() {
  return console.log('Connection back up :-)');
});

ss.server.on('ready', function() {
  return jQuery(function() {
    return require('/app');
  });
});

});