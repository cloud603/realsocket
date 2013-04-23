require.define("/app", function (require, module, exports, __dirname, __filename){
	/* QUICK CHAT DEMO
	 */

	var pad2, timestamp, valid, getRandom, loadChannels, chatTo, chatType, startChart;
	var $members = $("#members")
		, $loginForm = $("#formLogin")
		, $toUser = $("#toUser")
		, $chatForm = $("#demo")
		, $channels = $("#channels")
		, userId = null;


	ss.event.on('newMessage', function(data) {
		var html;
		var from = data.from == userId ? 'You' : data.from;
		var to = data.to == userId ? 'You' : data.to || "All";

		message = from + ' To ' + to + ': ' + data.message;
		html = ss.tmpl['chat-message'].render({
			message: message,
			time: function() {
				return timestamp();
			}
		});
		return $(html).hide().appendTo('#chatlog').slideDown();
	});

	ss.event.on('members', function(users){
		var html = '<li class="all">All</li>';
		users.forEach(function(name){
			if(name == userId) return;
			html += '<li>' + name + '</li>';
		});
		$("ul", $members).html(html);
		$("li", $members).bind("click", function(){
			var to = $(this).text();
			startChart(to, to == "All" ? to : "user");
		});
	});

	ss.event.on('online', function(user){
		console.log("User [%s] online.", user);
	});

	ss.event.on('offline', function(user){
		console.log("User [%s] offline.", user);
	});

	ss.event.on("subscribe", function(data){
		console.log("abc");
		console.log("[%s] subscribe [%s]", data.user, data.channel);
	});

	ss.event.on("unsubscribe", function(data){
		console.log("[%s] unsubscribe [%s]", data.user, data.channel);
	});

	$('#demo').on('submit', function() {
		var data = {
			to: chatTo || "",
			message: $('#myMessage').val(),
			type: chatType
		};
		return exports.send(data, function(success) {
			if (success) {
				return $('#myMessage').val('');
			} else {
				return alert('Oops! Unable to send message');
			}
		});
	});

	$loginForm.on('submit', function(){
		var mail = $("#txtMail").val();
		exports.login(mail, function(success){
			if(success){
				userId = mail;
				$("#formLogin").hide();
				$("#demo").show();
				$members.show();
				$("#username").text(mail + ",");
			};
		});
		return false;
	});

	exports.subscribe = function(channel, cb){
		return ss.rpc('demo.subscribe', channel, cb);
	};

	exports.unsubscribe = function(channel, cb){
		return ss.rpc('demo.unsubscribe', channel, cb);
	};

	exports.login = function(mail, cb){
		if (valid(mail)) {
			return ss.rpc('demo.login', mail, cb);
		} else {
			return cb(false);
		}
	};

	exports.send = function(data, cb) {
		return ss.rpc('demo.sendMessage', data, cb);
	};

	timestamp = function() {
		var d;
		d = new Date();
		return d.getHours() + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
	};

	startChart = function(to, type){
		chatTo = to;
		chatType = type;
		$("span", $toUser).text(to + " " + type);
	}

	pad2 = function(number) {
		return (number < 10 ? '0' : '') + number;
	};

	valid = function(text) {
		return text && text.length > 0;
	};

	getRandom = function (n){
		return Math.floor(Math.random()*n+1);
	};

	loadChannels = function(){
		var html = '';
		["Disney", "Discovery"].forEach(function(name){
			html += '<li><label>' + name + '</label><button>Join</button></li>';
		});

		$("ul", $channels).html(html);
		$("li", $channels).bind("click", function(e){
			var isButton = e.target.tagName.toLowerCase() == "button";
			var $this = $(this);
			var channel = $("label",$this).text();

			if(isButton){
				var klass = 'joined';
				var isJoined = $this.hasClass(klass);
				$this.toggleClass(klass, !isJoined);

				isJoined ? exports.unsubscribe(channel) : exports.subscribe(channel);
			}else{
				startChart(channel, "channel");
			};

		});
	};

	$("#demo").hide();
	$("#formLogin").show();
	loadChannels();
 $("#txtMail").val(getRandom(999999));
 $('#formLogin').trigger('submit');
});
