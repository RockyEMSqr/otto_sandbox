import {Router} from 'preact-router';
import { Page1 } from './pages/page1';
import { Page2 } from './pages/page2';
import { Page3 } from './pages/page3';
import {h} from 'preact'; 
export const App = (p:{url?:string})=>{
    return <div class="app">
        <nav>
            <a href="/page1">Page1</a>
            <a href="/page2">Page2</a>
            <a href="/page3">Page3</a>
        </nav>
        <Router url={p.url}>
            <Page1 path="/page1" default/>
            <Page2 path="/page2"/>
            <Page3 path="/page3"/>
        </Router>
    </div>
}