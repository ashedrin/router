'use strict';

export default class Router {
	constructor(routes) {
		this.routes = routes;
	}

	setRoute(route) {
		let routeIsUnique = true;
		this.routes.forEach((findRoute) => {
			if (findRoute.name === route.name) {
				routeIsUnique = false;
				findRoute.path = route.path;
			}
		});

		if (routeIsUnique) { this.routes.push(route); }

		return routeIsUnique;
	}

	getPath(routeName, inLineParams = {}, queryParams = {}) {
		const originalPath = this.getOriginalPath(routeName);
		const replacedPath = this.replaceParams(originalPath, inLineParams);

		return this.appendQueryParams(replacedPath, queryParams);
	}

	appendQueryParams(path, params) {
		const pairs = [];
		const updatedPath = path.includes("?") ? path : path + "?"

		Object.keys(params).forEach(
			key => {
				pairs.push(key + "=" + params[key]);
			}
		);

		return pairs.length ? updatedPath + pairs.join("&") : path;
	}
	
	getOriginalPath(routeName) {
		const route = this.getRoute(routeName);

		return route.path;
	}
	
	getRoute(routeName) {
		let foundRoute = null;
		this.routes.forEach((route) => {
			if (route.name === routeName) { foundRoute = route; }
		});

		if (!foundRoute) {
			throw new Error(`Route with name '${routeName}' not found!`);
		}
		
		return foundRoute;
	}

	replaceParams(path, params) {
		Object.keys(params).forEach(key => {
			path = path.replace(`:${key}`, params[key]);
		});
		
		return path;
	}
}
