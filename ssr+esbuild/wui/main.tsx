import {hydrate, render, h} from 'preact';
import {App} from './app';
import 'vite/modulepreload-polyfill'
if (typeof window !== 'undefined') {
    let mp = window.document.getElementById('app')!
    // render(<App />, mp);
    hydrate(<App {...window.context} />, mp)
  } else {
    console.log('You are on the server')
  }
