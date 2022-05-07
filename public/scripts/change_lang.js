let getTime = (lang) => {
	let date = new Date();
	let out;
	if(lang == 'ru'){
		out = date.getHours() + ":" + date.getMinutes();
	}

	if(lang == 'en'){
		let h = date.getHours();
		if(h > 12) out = (h - 12) + ":" + date.getMinutes() + " PM"; 
		else out = h + ":" + date.getMinutes() + " AM";
	}

	return out;
}

let getDate = (lang) => {
	let date = new Date();
	let out;
	let d = date.getDate();
	let m = date.getMonth();
	let y = date.getFullYear();
	
	if(lang == 'ru'){
		out = d + '.' + m + '.' + y;
	}

	if(lang == 'en'){
		out = m + '.' + d + '.' + y;
	}
	return out;
}

let changeDate = (time, date) => {
	let t = document.querySelector('.time');
	let d = document.querySelector('.date');

	t.innerHTML = time;
	d.innerHTML = date;
}

(() => {
	ru.onclick = () => {
		localStorage.lang = 'ru';
		changeDate(
			getTime('ru'),
			getDate('ru')
		);
		sendRequest();
	}
	en.onclick = () => {
		localStorage.lang = 'en';
		changeDate(
			getTime('en'),
			getDate('en')
		);
		sendRequest();
	}
})()


sendRequest();