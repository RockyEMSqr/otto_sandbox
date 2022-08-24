import renderToString from 'preact-render-to-string';
import {App} from '../wui/app';
import {h, Component} from 'preact';
class Test extends Component{
    render(){
        return <div class="test">{JSON.stringify(this.context)}
        
        <div>{this.context.x}</div></div>
    }
}
const Test1 = (p:any, c:any)=>{
    return <div><pre>{JSON.stringify(c)}</pre></div>
}
let html = renderToString(<Test1/>, {x:5}, {pretty:true});
console.log(html)