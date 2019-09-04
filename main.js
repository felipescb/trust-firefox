var portFromCS;
var triggerUrl = "https://tate.cached.id/end"

function onError(error) {
  console.log(`Error: ${error}`);
}

function onFinishExperience(tabInfo) {
	console.log(tabInfo);
}

function connected(p) {
  portFromCS = p;
  portFromCS.onMessage.addListener(function(m) {

    if(m.location == triggerUrl) {
    	

  		browser.tabs.query({active: true})
		  .then(tabs => browser.tabs.get(tabs[0].id))
		  .then(tab => {
		    console.info(tab);
		    var id = tab.id;

		    var newCached = browser.tabs.create({
    			url:"https://tate.cached.id"
  			});

  			newCached.then(function() {
  				var removing = browser.tabs.remove(id);
				removing.then(function() {
					browser.browsingData.removeCookies({});
				}, onError);
  			}, onError)
		  });


  		
    }

  });
}

browser.runtime.onConnect.addListener(connected);