import App from './App.svelte';
import {script} from './script';
import {products} from './products';

const app = new App({
	target: document.body,
	props: {
		script,
		products
	}
});

export default app;