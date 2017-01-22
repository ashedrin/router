### Simple router

Collect paths by name. Can replace path params.

#### Install

```
npm install route-service
```

#### Sample

```ecmascript 6
import Router from 'router';

const router = new Router([
	{ name: 'index', path: '/' },
    ...
]);

router.setRoute({ name: 'post', path: '/post/:postSlug' });

// Return '/index' 
router.getPath('index');

// Return '/post/my-post'
router.getPath('post', { postSlug: 'my-post' });
```

#### Run Developer environment

```
1. clone repository
1. npm install
1. npm run tests
```