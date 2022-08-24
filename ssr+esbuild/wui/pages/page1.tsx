import { PageProps } from "./pageprops"
import {h} from 'preact';
import {RichTextEditor, Text} from '@emsquared/otto_preact_form';
export const Page1 = (p:PageProps)=>{
    return <div>
        Page1
        <Text label="IDK" />
        <RichTextEditor label="RICH"/>
        
        </div>
}