//let json = '{"head":{"title":"Home"},"body":{"head_page": "Travel around the world","menu1": ["Popular tours", "Italy", "Germany", "Czech Republic","What to visit","Upcoming tours","Login/Registration","Contact us"],"country1":["Italy", "Italy is not called a museum country for nothing, because three quarters of Europes cultural heritage are concentrated here. But museums are closed and uniform, and Italy consists of many regions and cities with vibrant culture, vibrant history and unique traditions. Each of them rightfully considers himself special and is proud of it."],"country2":["Germany", "Germany impresses travelers with thoughtful comfort, the beauty of landscapes and magnificent sights. Here you can stay in the most modern chain hotel or get settled in a cozy family boarding house, stroll through ancient universities and castles or visit exhibitions of the latest scientific achievements, visit magnificent medical centers or go to study the successes of German winegrowers."],"country3":["Czech Republic", "One of the most distinctive and attractive European countries for tourists with a rich history, many interesting sights, castles and cultural monuments. You will see the Gothic spires of Prague and Prague streets, the ancient Charles Bridge over the Vltava River, hundreds of castles and churches in cozy old towns."],"link_up":["Up", "Up", "Up"]}}';
let embedJSON = (json) => {
	let page = JSON.parse(json);
	let title = document.querySelector('title');
	title.innerHTML = page.head.title;

	for(let key in page.body){

		let elems = document.querySelectorAll("." + key);

		if(typeof page.body[key] == "string") elems[0].innerHTML = page.body[key];
		else{
			for(let i = 0; i < elems.length; i++){
				let elem = elems[i];
				elem.innerHTML = page.body[key][i];
			}
		}
	}
}

//embedJSON(json);


