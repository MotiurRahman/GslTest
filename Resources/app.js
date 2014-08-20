var win = Titanium.UI.createWindow({
	title : 'Audio Test',
	backgroundColor : '#000',
	layout : 'vertical'
});

var startStopButton = Titanium.UI.createButton({
	title : 'Start/Stop Streaming',
	top : 10,
	width : 200,
	height : 40,
});

var pauseResumeButton = Titanium.UI.createButton({
	title : 'Pause/Resume Streaming',
	top : 10,
	width : 200,
	height : 40,
	enabled : false
});

win.add(startStopButton);
win.add(pauseResumeButton);

var pb = Titanium.UI.createProgressBar({
	top : 10,
	width : 250,
	height : 'auto',
	min : 0,
	max : 200,
	value : 0,
	color : '#fff',
	message : 'Playing is going',
	font : {
		fontSize : 14,
		fontWeight : 'bold'
	},

});

// allowBackground: true on Android allows the
// player to keep playing when the app is in the
// background.

//Ti.Media.createSound({url:"sound.wav"});
var audioPlayer = Ti.Media.createAudioPlayer({
	url : 'http://www.music.com.bd/download/Music/A/Abdul%20Jabber/Abdul%20Jabber%20-%20Petch%20Dhala%20Ei%20(music.com.bd).mp3',
	allowBackground : true
});

startStopButton.addEventListener('click', function() {
	// When paused, playing returns false.
	// If both are false, playback is stopped.
	if (audioPlayer.playing || audioPlayer.paused) {
		audioPlayer.stop();
		pauseResumeButton.enabled = false;
		if (Ti.Platform.name === 'android') {
			audioPlayer.release();
		}
	} else {

		audioPlayer.start();
		pauseResumeButton.enabled = true;
	}
});

pauseResumeButton.addEventListener('click', function() {
	if (audioPlayer.paused) {
		audioPlayer.start();
	} else {
		audioPlayer.pause();
	}
});

var progresValue;

audioPlayer.addEventListener('progress', function(e) {
	Ti.API.info(e.progress);
	progresValue = e.progress;
	pb.value = Math.round(e.progress / 1000);

});

win.add(pb);
pb.show();

audioPlayer.addEventListener('change', function(e) {
	Ti.API.info('State: ' + e.description + ' (' + e.state + ')');
});

win.addEventListener('close', function() {
	audioPlayer.stop();
	if (Ti.Platform.osname === 'android') {
		audioPlayer.release();
	}
});

win.open();
