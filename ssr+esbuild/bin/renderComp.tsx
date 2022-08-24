import renderToString from 'preact-render-to-string';
import {App} from '../wui/app';
// import {Text} from 'preact-cli-widget-ts';
import { Text} from '@emsquared/otto_preact_form';
import {h, Component} from 'preact';
class Test extends Component{
    render(){
        return <div class="test">{JSON.stringify(this.context)}
        
        <div>{this.context.x}</div></div>
    }
}
const Test1 = (p:any, c:any)=>{
    return <div>
        <div><Text /></div>
        <pre>{JSON.stringify(c)}</pre></div>
}
let html = renderToString(<div><Test1/></div>, {x:5}, {pretty:true});
console.log(html)