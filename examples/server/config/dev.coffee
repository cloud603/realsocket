redisSrv = '127.0.0.1'
redisPort = 6379
redisDb = 1
mongoPort = 27017
mongoSrv = '127.0.0.1'
  
module.exports =
  redisSrv: redisSrv
  redisPort: redisPort
  redisDb: redisDb
  mongoPort: mongoPort
  mongoSrv: mongoSrv
  mongoDbName: 'cloud603'
  getDb: ->
    require('mongoskin').db mongoSrv + ':' + mongoPort + '/barcode?auto_reconnect'