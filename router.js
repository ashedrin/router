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

	getPath(routeName, params = {}) {
		const originalPath = this.getOriginalPath(routeName);

		return this.replaceParams(originalPath, params);
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