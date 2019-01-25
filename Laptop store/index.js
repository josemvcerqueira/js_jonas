const fs = require("fs");
const http = require("http");
const url = require("url");

const json = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const laptopData = JSON.parse(json);

const server = http.createServer((request, response) => {

	const pathName = url.parse(request.url, true).pathname;
	const id = url.parse(request.url, true).query.id;

	if (request.url === '/favicon.ico') {
		res.writeHead(200, {
			'Content-Type': 'image/x-icon'
		});
		response.end();
		return;
	}

	if (pathName === "/products") {
		response.writeHead(200, {
			"Content-type": "text/html"
		});
		// Product Overview
		renderPage(response);

	} else if (pathName === "/") {
		response.writeHead(200, {
			"Content-type": "text/html"
		});
		// Product Overview
		renderPage(response);

	} else if (pathName === "/laptop" && id < laptopData.length) {
		response.writeHead(200, {
			"Content-type": "text/html"
		});
		// Laptop Page
		fs.readFile(`${__dirname}/templates/templateLaptop.html`, "utf-8", (error, data) => {
			const laptop = laptopData[id]

			//replace returns a new string
			const output = replaceTemplate(data, laptop);
			response.end(output);
		});

	} else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
		fs.readFile(`${__dirname}/data/img${pathName}`, (error, data) => {
			response.writeHead(200, {
				"Content-type": "image/jpg"
			});
			response.end(data);
		});
	} else {
		response.writeHead(404, {
			"Content-type": "text/html"
		});
		// URL Not found
		response.end("URL was not found on the server!");
	}
});

server.listen(1337, "127.0.0.1", () => {
	console.log("Listening for requests now");
});

function replaceTemplate(originalHTML, laptop) {
	let output = originalHTML.replace(/{%PRODUCTNAME%}/g, laptop.productName);
	output = output.replace(/{%IMAGE%}/g, laptop.image);
	output = output.replace(/{%PRICE%}/g, laptop.price);
	output = output.replace(/{%SCREEN%}/g, laptop.screen);
	output = output.replace(/{%CPU%}/g, laptop.cpu);
	output = output.replace(/{%STORAGE%}/g, laptop.storage);
	output = output.replace(/{%RAM%}/g, laptop.ram);
	output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
	output = output.replace(/{%ID%}/g, laptop.id);
	return output;
}

function renderPage(response) {
	let x;
	const render = fs.readFile(`${__dirname}/templates/templateOverview.html`, "utf-8", (error, data) => {
		let overviewOutput = data;
		fs.readFile(`${__dirname}/templates/templateCard.html`, "utf-8", (error, data) => {
			const cardsOuput = laptopData.map(el => replaceTemplate(data, el)).join("");
			overviewOutput = overviewOutput.replace("{%CARDS%}", cardsOuput)
			x = response.end(overviewOutput);
		});
	});
	return x;
}