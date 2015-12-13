var hostName = "com.denieler.shuttle_control_panel";
console.log("Connecting to native messaging host " + hostName);

var port = chrome.runtime.connectNative(hostName);

port.onMessage.addListener(onNativeMessage);
port.onDisconnect.addListener(onDisconnected);

function onNativeMessage(message) {
	var route = message.action;

	switch(route){
		case 'next-song':
			nextSong();
			break;
		case 'prev-song':
			prevSong();
			break;
		case 'pause-song':
			pauseSong();
			break;		
		case 'up-volume':
			upVolume();
			break;
		case 'down-volume':
			downVolume();
			break;
	}
}

function onDisconnected() {
    console.error("Failed to connect: " + chrome.runtime.lastError.message);
    port = null;
}

function findVkMusicTab (callback) {
	chrome.tabs.query({}, function (result){
		var found = false;
		result.forEach(function(tab){

			if(tab.audible && tab.url.search('vk.com') != -1){
				found = true;
				callback(tab);
			}

		});

		//not found
		if (!found) {
			var ctrlSelector = '#audios_list';
			result.forEach(function(tab){
				chrome.tabs.executeScript(tab.id,
				{
					code: 'return document.querySelector(\'' + ctrlSelector + '\');'
				}, function (resultElement) {
					if (resultElement && resultElement.length > 0 && tab.url.search('vk.com') != -1)
					{
						callback(tab);
					}
				});
			});
		}
	});
}

function pauseSong () {
	var ctrlSelector = '#ac_controls #ac_play';

	findVkMusicTab(function (tab){
	    var tab_id = tab.id;

		chrome.tabs.executeScript(tab_id,
		{
			code: 'var ctrl = document.querySelector(\'' + ctrlSelector + '\'); ctrl.click();'
		});
	});
}


function prevSong () {
	var ctrlSelector = '#ac_controls #ac_prev .prev.ctrl';

	findVkMusicTab(function (tab){
	    var tab_id = tab.id;

		chrome.tabs.executeScript(tab_id,
		{
			code: 'var ctrl = document.querySelector(\'' + ctrlSelector + '\'); ctrl.click();'
		});
	});
}

function nextSong () {
	var ctrlSelector = '#ac_controls #ac_next .next.ctrl';

	findVkMusicTab(function (tab){
	    var tab_id = tab.id;

		chrome.tabs.executeScript(tab_id,
		{
			code: 'var ctrl = document.querySelector(\'' + ctrlSelector + '\'); ctrl.click();'
		});
	});
}

function upVolume () {
	findVkMusicTab(function (tab){
	    var tab_id = tab.id;

		chrome.tabs.executeScript(tab_id,
		{
			code: 'var s = document.createElement(\'script\');' +
			's.src = chrome.extension.getURL(\'vk_files/up-volume.js\');' +
			's.onload = function() {this.parentNode.removeChild(this);};' +
			'(document.head || document.documentElement).appendChild(s);'
		});
	});	
}

function downVolume () {
	findVkMusicTab(function (tab){
	    var tab_id = tab.id;

		chrome.tabs.executeScript(tab_id,
		{
			code: 'var s = document.createElement(\'script\');' +
			's.src = chrome.extension.getURL(\'vk_files/down-volume.js\');' +
			's.onload = function() {this.parentNode.removeChild(this);};' +
			'(document.head || document.documentElement).appendChild(s);'
		});
	});	
}