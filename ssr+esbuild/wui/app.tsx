import { Router } from 'preact-router';
import { Page1 } from './pages/page1';
import { Page2 } from './pages/page2';
import { Page3 } from './pages/page3';
import { h } from 'preact';
export const App = (p: { url?: string, user: any }, c: any) => {
    return <div class="app">
        <pre>{JSON.stringify(c)}</pre>
        <nav>
            <a href="/page1">Page1</a>
            <a href="/page2">Page2</a>
            <a href="/page3">Page3</a>
            <a href="/">{p.user?.username}</a>
            <a data-native href="/auth/logout">Logout</a>
        </nav>
        <Router url={p.url}>
            <Page1 path="/page1" default />
            <Page2 path="/page2" />
            <Page3 path="/page3" />
        </Router>
    </div>
}

export default App;
// import { hydrate, render } from 'preact';
// // import 'vite/modulepreload-polyfill'
// if (typeof window !== 'undefined') {
//     let mp = window.document.getElementById('app')!
//     // render(<App />, mp);
//     hydrate(<App {...window.context} />, mp)
// } else {
//     console.log('You are on the server')
// }