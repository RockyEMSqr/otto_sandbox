import { PageProps } from "./pageprops"
import {h} from 'preact';
import { Choosy, FDateTime } from "@emsquared/otto_preact_form";
export const Page2 = (p:PageProps)=>{
    return <div>Page2

        <FDateTime label="DT" />
        <Choosy label="Choosy" items={[1,2,3,4,5,6,7,8].map(x=>({name:x, value:x}))} />
    </div>
}