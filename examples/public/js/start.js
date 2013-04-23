require('events-responder')(0, {}, require('socketstream').send(0)); 
require('socketstream-rpc')(1, {}, require('socketstream').send(1)); 
require('socketstream').assignTransport({}); require('/entry');