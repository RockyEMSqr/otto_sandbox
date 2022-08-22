import {render, h} from 'preact';
import {App} from './app';
import 'vite/modulepreload-polyfill'
if (typeof window !== 'undefined') {
    render(<App />, window.document.body);
  } else {
    console.log('You are on the server')
  }
