redisSrv = '127.0.0.1'
redisPort = 6379
redisDb = 1
mongoPort = 27017
mongoSrv = '10.2.0.190'
  
module.exports =
  redisSrv: redisSrv
  redisPort: redisPort
  redisDb: redisDb
  mongoPort: mongoPort
  mongoSrv: mongoSrv
  mongoDbName: 'cloud603'
  smtp:
    server: 'smtp.gmail.com'
    port: 587
    accountName: 'info@cloud603.com'
    password: 'asdf1234//'
  getDb: ->
    require('mongoskin').db mongoSrv + ':' + mongoPort + '/cloud603?auto_reconnect'