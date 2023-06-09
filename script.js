console.log("starting");

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => console.log('Service worker registered', registration))
    .catch(error => console.error('Service worker registration failed', error));
}

/////////////////////////////////////////////////////////
// printarei to title tou current tab
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
	const activeTab = tabs[0];
    console.log(activeTab.title); });
	
// unicode string to hex:
// "aa".split("").reduce((hex,c)=>hex+=c.charCodeAt(0).toString(16).padStart(4,"0"),"")



/////////////////////////////////////////////////////////
// get a cookie from the active tab, with name "d"
function getSlackCookie() {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	  // Get the current tab
	  var activeTab = tabs[0];

	  // Get the cookie by name
	  chrome.cookies.get({ url: activeTab.url, name: 'd' }, function (cookie) {
		  //debugger;
		if (cookie) {
		  alert(cookie.value);
		} else {
		  console.log('Cookie not found!');
		}
	  });
	});
}



////////////////////////////////////////////////////////////////////////////////////
// get and parse a value from localStorage from the active tab, with name "localConfig_v2"
function getSlacklocal() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.scripting.executeScript({
		target: {tabId: tabs[0].id},
		function: function() {
		  var myVariable = JSON.parse(localStorage.getItem('localConfig_v2'));
		  return myVariable.teams.T1S2RKGUA.token;
		}
	  }, function(result) {
		if (chrome.runtime.lastError) {
		  console.error(chrome.runtime.lastError);
		} else {
		  //console.log(result[0].result);
		  alert(result[0].result);
		}
	  });
	});
}


//////// ADDING CLICK HANDLERS
document.getElementById('youtube').addEventListener('click', yt);
document.getElementById('slack').addEventListener('click', slackStuff);
document.getElementById('session').addEventListener('click', keepsession);




// handler of slack button
function slackStuff() {
	var mode;

	if(document.getElementById('slack').style.color == 'gray') // an einai gray einai off..
		mode = 0;
	else
		mode = 1;

	if(!mode) {
		document.getElementById('slack').style.color = 'blue';
		mode = 1;
	}
	else {
		document.getElementById('slack').style.color = 'gray';
		mode = 0;
	}

	if(mode) {	// if enabled, do this:
		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
			var url = tabs[0].url;
			console.log("Checking URL of the active tab : " + url);
			if(url.indexOf('slack') >= 0) {	// if you are in slack already
				getSlackCookie();
				getSlacklocal();
			} else {	// else if you are not, redirect there..
				console.log('trying to redirect to slack..');
				chrome.tabs.update({url: "https://app.slack.com/client/T1S2RKGUA/C1S26F0F8"}, function(tab) {
					chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
						if (tabId === tab.id && changeInfo.status === 'complete') {
						  // call your function here
						  console.log('finished loading...!');
						  getSlackCookie();
						  getSlacklocal();
						}
					})
				});
			}
		});
	}
}

function yt() {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// prepei na diloso mia global var kai na vlepo an yparxei oste na treksei o kodikas i oxi:
// function myFunction() {
// 		window.myGlobalVariable = "Hello World!";
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////  code to be injected: var a = setInterval(function(){ if( document.querySelector('#blocking-container').checkVisibility() ) { document.querySelector('#button').click(); console.log('Done bro.. I clicked the shit!'); } }, 1000);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	var mode;

	if(document.getElementById('youtube').style.color == 'gray') // an einai gray einai off..
		mode = 0;
	else
		mode = 1;

	if(!mode) {
		document.getElementById('youtube').style.color = 'blue';
		mode=1;
	}
	else {
		document.getElementById('youtube').style.color = 'gray';
		mode=0;
	}
	
	// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
	  // var activeTab = tabs[0];
	  // var url = activeTab.url;
	  // console.log('The active tab has the URL: ' + url);
	// });
	
	// Define the code to be injected into the active tab's page
	

	if(mode) {
		// Get the active tab
		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		  const activeTab = tabs[0];

		  // Inject the code into the active tab's page
		  chrome.scripting.executeScript(
			{
			  target: { tabId: activeTab.id },
			  func: () => {
				  document.body.innerHTML = '<p>Enabling!</p>' + document.body.innerHTML;
				  // setInterval(function(){console.log( (new Date).toString() )}, 1000);
			  }
			},
			() => {
			  console.log('Code injected');
			}
		  );
		});
	} else {
		// Get the active tab
		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		  const activeTab = tabs[0];

		  // Inject the code into the active tab's page huh?
		  chrome.scripting.executeScript(
			{
			  target: { tabId: activeTab.id },
			  func: () => {
				  document.body.innerHTML = '<p>Disabling!</p>' + document.body.innerHTML;
				  // setInterval(function(){console.log( (new Date).toString() )}, 1000);
			  }
			},
			() => {
			  console.log('Code injected');
			}
		  );
		});
	}
	
	
}


function keepsession() {
	var mode;

	if(document.getElementById('session').style.color == 'gray') // an einai gray einai off..
		mode = 0;
	else
		mode = 1;

	if(!mode) {
		document.getElementById('session').style.color = 'blue';
		mode=1;
	}
	else {
		document.getElementById('session').style.color = 'gray';
		mode=0;
	}
	

	if(mode) {						// if it is enabled...
	
		// Register a service worker to keep the script running in the background
		navigator.serviceWorker.register('service-worker.js');

		// // Get the active tab
		// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		  // const activeTab = tabs[0];

		  // // Inject the code into the active tab's page
		  // chrome.scripting.executeScript(
			// {
			  // target: { tabId: activeTab.id },
			  // func: () => {
				  // var el = document.querySelector('button');
				  // if(el) {
					  // console.log('starting..');
				  // }
				  // el.click();
				  // // this is the point where i need to read the tab's url from the main extension code.
				  
			  // }
			// },
			// () => {
				  // console.log('Code injected');
				  // // here i have to get the tab's url.
				  // // when you read the last 12 chars to be ".cloud/en-us" then
				  // // execute history.back() to the tab.
				  // var checkback = setInterval(function(){
					  // // check till the 
					  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					  // var tab = tabs[0];
					  // var url = tab.url;
					  // console.log('Checking in order to go back in time! : ' + url);
					  // if(url.slice(-12) == '.cloud/en-us') {
						  // console.log('Time to go back...!');
						  // clearInterval(checkback);
						  
						  // // ready to inject code in order to make 'history.back();'
						  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
						  // chrome.scripting.executeScript({
							// target: {tabId: tabs[0].id},
							// function: function() {
							  // // Your code to be injected goes here
							  // history.back();
							// }
						  // });
						// });
					  // }
				  // });
				// }, 6000);
			// }
		  // );
		// });
	} else {						// if it is disabled
		navigator.serviceWorker.getRegistration()
		  .then(function(registration) {
			if (registration) {
			  registration.unregister();
			}
		  });
		// Get the active tab
		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		  const activeTab = tabs[0];

		  // Inject the code into the active tab's page huh?
		  chrome.scripting.executeScript(
			{
			  target: { tabId: activeTab.id },
			  func: () => {
				  document.body.innerHTML = '<p>Disabling!</p>' + document.body.innerHTML;
				  // setInterval(function(){console.log( (new Date).toString() )}, 1000);
			  }
			},
			() => {
			  console.log('Code injected');
			}
		  );
		});
	}
	
	
}

//alert(1);