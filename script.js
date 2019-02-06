// https://stackoverflow.com/a/29106129
// todo add client language support
function getFirstBrowserLanguage() {
    var nav = window.navigator,
    browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
    i,
    language;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
      for (i = 0; i < nav.languages.length; i++) {
        language = nav.languages[i];
        if (language && language.length) {
          return language;
        }
      }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        return language;
      }
    }

    return "en-US";
  };
  
function update(data) {
	var item;
	var deaths = 0;
	for (i = data.length - 1; i >= 0; i--){
		item = data[i];
		if (item['Region of Incident'] == 'Mediterranean'){
			deaths += parseInt(item['Total Dead and Missing']);
		}
	}
	
	var element = document.getElementById('this-year');
    element.innerHTML = deaths;
    element.className = deaths > 0 ? 'bad' : '';
}
  
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);

        update(data);
    }
};
xhttp.open('GET', 'https://missingmigrants.iom.int/global-figures/2019/json', true);
xhttp.send();