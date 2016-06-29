'use strict';

var Router = {
    routes: [],
    append: function(name, path) {
        var hasRoute = this.get(name);
        if(!hasRoute) {
            this.routes.push({name: name, path: path});
        } else { hasRoute.path = path; }
    },
    get: function(name) {
        var findRoute = null;
        this.routes.forEach(route => route.name == name ? findRoute = route : null);
        return findRoute;
    },
    getPath: function(name) {
        var findPath = null;
        this.routes.forEach(route => route.name == name ? findPath = route.path : null);
        return findPath;
    }
};