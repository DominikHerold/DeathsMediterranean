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
