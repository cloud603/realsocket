// Generated by CoffeeScript 1.6.2
(function() {
  var redis;

  redis = require('redis');

  module.exports = function(config) {
    var conn, host, options, port;

    if (config == null) {
      config = {};
    }
    port = config.port || 6379;
    host = config.host || "127.0.0.1";
    options = config.options || {};
    conn = {};
    ['pub', 'sub'].forEach(function(name) {
      conn[name] = redis.createClient(port, host, options);
      if (config.pass) {
        conn[name].auth(config.pass);
      }
      if (config.db) {
        return conn[name].select(config.db);
      }
    });
    return {
      listen: function(cb) {
        conn.sub.subscribe("ss:event");
        return conn.sub.on('message', function(channel, msg) {
          return cb(JSON.parse(msg));
        });
      },
      send: function(obj) {
        var msg;

        msg = JSON.stringify(obj);
        return conn.pub.publish("ss:event", msg);
      }
    };
  };

}).call(this);
