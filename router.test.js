import { describe, it } from 'mocha';
import { expect } from 'chai';
import Router from './lib/router';

describe('Test system router', () => {
    describe('Test constructor', () => {
        it('Find route', (done) => {
            const findRoutePath = 'find-route-path';
            const router = new Router([{ name: 'findRoute', path: findRoutePath }]);
            expect(router.getPath('findRoute')).to.equal(findRoutePath);
            done();
        });
    });
    describe('Test set method', () => {
        it('Find new route', (done) => {
            const findRoutePath = 'new-route-path';
            const router = new Router([{ name: 'anyRoute', path: 'any-route-path' }]);
            router.setRoute({ name: 'newRoute', path: findRoutePath });
            expect(router.getPath('newRoute')).to.equal(findRoutePath);
            done();
        });
        it('Find old route', (done) => {
            const findRoutePath = 'new-route-path';
            const router = new Router([{ name: 'anyRoute', path: 'any-route-path' }]);
            router.setRoute({ name: 'anyRoute', path: findRoutePath });
            expect(router.getPath('anyRoute')).to.equal(findRoutePath);
            done();
        });
    });
    describe('Test get method', () => {
        it('Check exception if route not found', (done) => {
            const router = new Router([{ name: 'findRouteWithParam', path: 'find-route-with/:param' }]);
            try {
                router.getPath('findRoute');
            } catch (error) { expect(error.message).to.equal(`Route with name 'findRoute' not found!`); }
            done();
        });
        it('Find with param', (done) => {
            const router = new Router([
							{ name: 'findRouteWithParam', path: 'find-route-with/:id/:slug' },
							{ name: 'findRouteWithParam2', path: 'find-route-with/:id-:slug' },
							{ name: 'findRouteWithParam3', path: 'find-route-with/:id:slug' },
							{ name: 'findRouteWithParam4', path: 'find-route-with/:id:/slug' },
						]);
            expect(
                router.getPath('findRouteWithParam', { id: 1, slug: 'slug' })
            ).to.equal('find-route-with/1/slug');
            expect(
                router.getPath('findRouteWithParam2', { id: 1, slug: 'slug' })
            ).to.equal('find-route-with/1-slug');
            expect(
                router.getPath('findRouteWithParam3', { id: 1, slug: 'slug' })
            ).to.equal('find-route-with/1slug');
            expect(
                router.getPath('findRouteWithParam4', { id: 1, slug: 'slug' })
            ).to.equal('find-route-with/1:/slug');
            done();
        });
    });
});