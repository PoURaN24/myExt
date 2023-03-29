console.log("starting");

/////////////////////////////////////////////////////////
// printarei to title tou current tab
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
	const activeTab = tabs[0];
    console.log(activeTab.title); });
	
// unicode string to hex:
// "aa".split("").reduce((hex,c)=>hex+=c.charCodeAt(0).toString(16).padStart(4,"0"),"")


/////////////////////////////////////////////////////////
// get a cookie from the active tab, with name "d"
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  // Get the current tab
  var activeTab = tabs[0];

  // Get the cookie by name
  chrome.cookies.get({ url: activeTab.url, name: 'd' }, function (cookie) {
      debugger;
    if (cookie) {
      console.log(cookie.value);
    } else {
      console.log('Cookie not found!');
    }
  });
});




////////////////////////////////////////////////////////////////////////////////////
// get and parse a value from localStorage from the active tab, with name "localConfig_v2"
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
      console.log(result[0].result);
    }
  });
});



document.getElementById('youtube').addEventListener('click', yt);
document.getElementById('general').addEventListener('click', gen);

function gen() {
	var mode;

	if(document.getElementById('general').style.color == 'gray') // an einai gray einai off..
		mode = 0;
	else
		mode = 1;

	if(!mode)
		document.getElementById('general').style.color = 'blue';
	else
		document.getElementById('general').style.color = 'gray';

}

function yt() {
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

//alert(1);