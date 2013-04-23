# Server-side Code

# Define actions which can be called from the client using ss.rpc('demo.ACTIONNAME', param1, param2...)
subscriptions = require('../../../src/').subscriptions

exports.actions = (req, res, ss) ->

  # Example of pre-loading sessions into req.session using internal middleware
  req.use('session')

  # Uncomment line below to use the middleware defined in server/middleware/example
  #req.use('example.authenticated')

  sendMessage: (data) ->
    from = req.session.userId
    method = 'newMessage'
    content =
      from: from
      to: data.to
      type: data.type
      message: data.message

    if !data.to || data.to.toLowerCase() == "all"
      ss.publish.all(method, content)     # Broadcast the message to everyone
    else
      #console.log(from, to)
      if data.type == "channel"
        ss.publish.channel(data.to, method, content)
      else
        ss.publish.users(data.to, method, content)
        #publish to self
        ss.publish.users(from, method, content)

    res(true)                                 # Confirm it was sent to the originating client
  logout: ->
    req.session.setUserId null, ->
      ss.publish.all("offline", req.session.userId);
      ss.publish.all("members", subscriptions.user.keys())
    res(true)

  subscribe: (channel) ->
    data =
      user: req.session.userId
      channel: channel

    req.session.channel.subscribe(channel)
    req.session.channel.reset()
    ss.publish.channel(channel, "newMessage", data);
    res(true)

    #console.log(req.session.channel.list());

  unsubscribe: (channel) ->
    req.session.channel.unsubscribe(channel)
    req.session.channel.reset()
    res(true)

  login: (mail) ->
    console.log(req.socketId);
    req.session.setUserId mail, ->
      ss.publish.all('online', mail);
      ss.publish.all("members", subscriptions.user.keys())
      #console.log(subscriptions.channel.keys())
      #console.log(subscriptions.user.keys())

    #fetch user list
    #console.log(req.session.userId)
    #ss.publish.all('newMessage', "yes")     # Broadcast the message to
    res(true)

