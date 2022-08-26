import { PageProps } from "./pageprops"
import {h} from 'preact';
import { Select } from "@emsquared/otto_preact_form";
export const Page3 = (p:PageProps)=>{
    return <div>Page3

        <Select label="Select" items={['asdf', 'asdfasdfasdf', 'asdfasdsdfsdfsdffasdf'].map(x=>({name:x, value:x}))} />
    </div>
}