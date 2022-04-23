let createRequest = (message) => {
	const request = new XMLHttpRequest();
	request.open("POST", "/upcoming_tours.html", true);
	request.setRequestHeader("Content-Type", "application/json");

	//message = JSON.stringify({message: message});
	request.send(message);

	request.addEventListener("load", function () {
        let answer = JSON.parse(request.response);

        let elem = document.getElementById(answer.key);
		let name = answer.name;
		let text = answer.text;
		elem.innerHTML = `<div class="name"><h3>${name}</h3></div><div class="comment_content"><p>${text}</p></div>` 
						+ elem.innerHTML;
		
        console.log(answer);
     });
};

// let button = document.getElementById('submit');
// let input = document.getElementById('input');

// button.onclick = () => {
// 	let message = input.value;
// 	createRequest(message);
// }

class FormComment{
	constructor(options){
		this.key = options.key;
		this.textarea = options.textarea;
		this.name = options.name;
		this.button = options.button;

		this.init();
	}
	init(){
		let textarea = this.textarea;
		this.textarea.onfocus = () => {
			this.textarea.rows = 2;
		}
		this.textarea.onblur = () => {
			if(!this.textarea.value) this.textarea.rows = 1;
		}
		this.textarea.onkeypress = () => {
			let text = this.textarea;
			let rows = Math.ceil(text.value.length / text.cols);
			if(rows > 2) text.rows = rows;
		}

		this.button.onclick = () => {
			let key = this.key;
			let text = this.textarea.value;
			let name = this.name.value;

			if(!name) name = 'Гость';

			let message = JSON.stringify({key: key, name: name, text: text});

			if(this.textarea.value)
				createRequest(message);

			this.textarea.value = '';
			this.textarea.rows = '';
			this.name.value = '';
		}
	}
}

let keys = ['dagestan', 'baikal', 'altai'];
let textareas = document.getElementsByClassName('comment_text');
let inputs = document.getElementsByClassName('comment_name');
let buttons = document.getElementsByClassName('comment_submit');

for(let i = 0; i < textareas.length; i++){
	new FormComment({
		key: keys[i],
		textarea: textareas[i],
		name: inputs[i],
		button: buttons[i]
	});
}

let comments = {
	'dagestan': [
		{
			name: 'Роман',
			text: 'Хорошо бы здесь побывать'
		},
		{
			name: 'Дарья',
			text: 'Обязательно приеду сюда летом'
		}
	],
	'baikal':[
		{
			name: 'Владимир',
			text: 'Я с Байкала, приезжайте к нам, не пожалеете'
		},
		{
			name: 'Ольга',
			text: 'Хочу посмотреть на нерп'
		},
		{
			name: 'Сева',
			text: 'Был тут в прошлом году, впечатления неисгладимые, приеду вновь'
		}
	],
	'altai':[
		{
			name: 'Наталья',
			text: 'Природа невероятная'
		},
		{
			name: 'Лена',
			text: 'Лучше гор могут быть только горы'
		}
	]
}

let createComments = (comments) => {
	for(let key in comments){
		for(let i = 0; i < comments[key].length; i++){
			let elem = document.getElementById(key);
			let name = comments[key][i].name;
			let text = comments[key][i].text;
			elem.innerHTML += `<div class="name"><h3>${name}</h3></div><div class="comment_content"><p>${text}</p></div>`;
		}
	}
}

createComments(comments);