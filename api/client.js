import request from "superagent";

export default class ApiClient {

	constructor(host, options = {}) {
		this.host = host || "https://80b5de3a.eu.ngrok.io" //"http://localhost:3030";
		this.options = { 
            // ...this.defaultOptions,
             ...options };
	}

	get(path) {
        return request.get(this.createUrl(path)).set(this.headers());
	}

	post(path, data = {}) {
		return request
			.post(this.createUrl(path))
            .set(this.headers())
			.send(data);
	}

	put(path, data = {}) {
		return request
			.put(this.createUrl(path))
			.set(this.headers())
			.send(data);
	}

	patch(path, data = {}) {
		return request
			.patch(this.createUrl(path))
			.set(this.headers())
			.send(data);
	}

	delete(path) {
		return request.delete(this.createUrl(path)).set(this.headers());
	}

	headers() {
		let headers = {
			Accept: "application/json"
		};

		return headers;
	}

	createUrl(path) {
		return [this.host, path].join("/");
	}
}
