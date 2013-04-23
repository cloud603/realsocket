module.exports = function(grunt) {
	grunt.registerTask('release', function(){
		var dir = process.env["SS_DEV"] ? 'src' : 'lib';
		var assets = require('./' + dir + '/assets');
		assets.load();
		var body = assets.serve.js();
		var filepath = 'build/realsocket.js';
		grunt.file.write(filepath, body, {encoding: "utf-8"});
	});

	grunt.registerTask('default', ['release']);
};