let createLangRequest = (page, message) => { // "/" {lang: "ru", file:"index.json"}
	const request = new XMLHttpRequest();
	request.open("POST", page, true);
	request.setRequestHeader("Content-Type", "application/json");

	//message = JSON.stringify({message: message});
	request.send(message);

	request.addEventListener("load", function () {
		embedJSON(request.response);
		console.log(JSON.parse(request.response));
	});
};

let sendRequest = () => {
	let page = document.location['pathname'];
	let lang = localStorage.lang || 'ru';
	let files = {
		'/' : 'index.json',
		'/upcoming_tours.html' : 'upcoming_tours.json',
		'/what_to_visit.html' : 'what_to_visit.json'
	}

	let message = {
		lang: lang,
		file: files[page]
	}
	console.log(message);
	message = JSON.stringify(message);

	createLangRequest(page, message);
}