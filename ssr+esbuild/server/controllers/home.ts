import { Controller, Get } from "@emsquared/otto_express";
import type { Response, Request } from 'express'
import { renderToString } from "preact-render-to-string";
import { render } from "../render";
@Controller('/')
export class HomeController {
    @Get('/page*')
    async home(req: Request, res: Response) {
        let html = await render('./wui/main', req);
        res.send(html)
        // res.render('app', {locals:{}})
    }
}