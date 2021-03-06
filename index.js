let path = require('path');
let express = require('express');
let app = express();
let fs = require("fs");

const PORT = process.env.PORT || 80;
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/index.html`);
});

app.get('/connection.html', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/connection.html`);
});

app.get('/login.html', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/login.html`);
});

app.get('/upcoming_tours.html', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/upcoming_tours.html`);
});

app.get('/what_to_visit.html', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/what_to_visit.html`);
});

app.listen(PORT, () => console.log("port: " + PORT + " Сервер запущен..."));

const jsonParser = express.json();

let sendLangJSON = (request, response) => {
	let lang = request.body.lang;
	let file = request.body.file;
	let fileContent = {err: "ошибка"};

	if(lang == 'ru'){
		fileContent = fs.readFileSync(`JSON/russian/${file}`, "utf8");
	}
	if(lang == 'en'){
		fileContent = fs.readFileSync(`JSON/english/${file}`, "utf8");
	}

	fileContent = JSON.parse(fileContent);
	response.json(fileContent);
}

app.post('/', jsonParser, (request, response) => {
	console.log(request.body);
	if(!request.body) return response.sendStatus(400);

	if(request.body.lang){
		sendLangJSON(request, response);
	}
});

app.post('/upcoming_tours.html', jsonParser, (request, response) => {
	console.log(request.body);
	if(!request.body) return response.sendStatus(400);

	if(request.body.lang){
		sendLangJSON(request, response);
	}
});

app.post("/what_to_visit.html", jsonParser, (request, response) => {
	console.log(request.body);
	if(!request.body) return response.sendStatus(400);

	if(request.body.key){
		let fileContent = fs.readFileSync("comments.json", "utf8");
		let comments = JSON.parse(fileContent);
		let name = request.body.name;
		let text = request.body.text;
		let key = request.body.key;
		comments[key].unshift({name: name, text: text});
		fileContent = JSON.stringify(comments);
	
		fs.writeFileSync("comments.json", fileContent);

		response.json(request.body); // отправляем пришедший ответ обратно
	}

	if(request.body.comments){
		let fileContent = fs.readFileSync("comments.json", "utf8");
		let comments = JSON.parse(fileContent);
		response.json(comments);
	}

	if(request.body.lang){
		sendLangJSON(request, response);
	}
});




const TelegramBot = require('node-telegram-bot-api')
const chatId = '733176205';
const token = '5274616297:AAEWo5OZs9-IGDr7q3CnpV5yJlrCYMj7OWY';

const bot = new TelegramBot(token, { polling: true });

// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
	const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

	// отправляем сообщение
	bot.sendMessage(chatId, 'Привет, Друг! чего хочешь?');
});

const urlencodedParser = express.urlencoded({extended: false});

app.post("/connection.html", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    // response.send(///
    // 			"User: " + request.body.firstname + '\n' +
				// "Email: " + request.body.email + '\n' +
				// "Message: " + request.body.message);

	//response.sendFile(`${__dirname}/public/pages/index.html`);
    bot.sendMessage(chatId, 
    	"User: " + request.body.firstname + '\n' +
		"Email: " + request.body.email + '\n' +
		"Message: " + request.body.message);
    response.end();
});
