import { Controller, Get, Post } from "@emsquared/otto_express";
import type { Response, Request } from 'express'
import { renderToString } from "preact-render-to-string";
import { render } from "../render";
@Controller('/auth')
export class AuthController {
    @Get('/login')
    async login(req: Request, res: Response) {
        let html = await render('./wui/pages/login', req);
        res.send(html)
    }
    @Post('/login')
    async post_login(req: Request, res: Response) {
        if (req.body.username == 'asdf') {
            // @ts-ignore
            req.session.authenticatedUser = { username: 'asdf' };
            req.session.save(err=>{
                res.redirect('/page1')
            })
            
        } else {
            let html = await render('./wui/pages/login', req, { errormsg: 'No Good' });
            res.send(html)
        }

    }
    @Get('/logout')
    logout(req:Request,res:Response){
        req.session.destroy((err)=>{
            res.redirect('/auth/login')
        })
    }
}