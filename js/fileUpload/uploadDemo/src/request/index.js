import axios from "axios";
import qs from "qs";
import { BASE_URL, TIME_OUT, MULTIPART, APP_JSON, APP_CODED } from "./config/request.config";
class myRequest {
	instance;
	interceptors;
	constructor(config) {
		this.instance = axios.create(config);
		this.interceptors = config.interceptors;

		if (this.interceptors) {
			this.instance.interceptors.request.use(this.interceptors.reqInterceptor);
			this.instance.interceptors.response.use(this.interceptors.resInterceptor);
		}
		this.instance.interceptors.response.use(
			res => {
				return res.data;
			},
			err => {
				return Promise.reject(err);
			}
		);
	}
	request(config) {
		return new Promise((resolve, reject) => {
			this.instance.request(config).then(
				res => {
					resolve(res);
				},
				err => {
					reject(err);
				}
			);
		});
	}
	get(url, config) {
		return this.request({ ...config, method: "GET", url });
	}
	post(url, config) {
		return this.request({ ...config, method: "POST", url });
	}
}

export const LinRequestMultipart = new myRequest({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	headers: {
		"Content-Type": MULTIPART,
	},
});

export const LinRequestAppCoded = new myRequest({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	headers: {
		"Content-Type": APP_CODED,
	},
	interceptors: {
		reqInterceptor: config => {
			config.data = qs.stringify(config.data);
			return config;
		},
	},
});

export const LinRequestAppJson = new myRequest({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	headers: {
		"Content-Type": APP_JSON,
	},
});
