
// Add an event listener for the "install" event
self.addEventListener('install', event => {
  console.log('Service worker installed.');
});

// Add an event listener for the "activate" event
self.addEventListener('activate', event => {
	console.log('Service worker activated.');
  
	var glob = 0;

	var interval = setInterval(function(){
		console.log('Hello! ' + glob);
		glob++;
	}, 1000);
	
});

// // Add an event listener for the "fetch" event
// self.addEventListener('fetch', event => {
  // console.log('Service worker intercepted a fetch request:', event.request.url);
// });


self.addEventListener('beforeunload', event => {
	clearInterval(interval);
	console.log('Just cleared the interval!');
	alert('unloading');
});



