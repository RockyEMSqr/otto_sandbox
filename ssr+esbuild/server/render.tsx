// import { renderToString } from "preact-render-to-string";
import renderToString from "preact-render-to-string";
import { App } from "../wui/app";
// import { Layout } from "../wui/pages/layout";
import { h } from 'preact';
import type { Request } from 'express';
import 'vite';
import globals from "./globals";
import fs from 'fs'
import path from 'path';
function renderMyHtml(template: string, params: Object) {
    const names = Object.keys(params);
    const vals = Object.values(params);
    return new Function(...names, `return \`${template}\`;`)(...vals);
}
export async function render(view: string, req: Request, ctx = {}) {
    let url = req.originalUrl;
    let viewPath = path.resolve(view);
    let m = require(viewPath);
    let comp = null;
    if (m) {
        comp = m.default;
    }
    let context = { ...ctx, user: req.authenticatedUser };
    let html = renderToString(h(comp, { url: url, ...context }), context)
    try {

        // 1. Read index.html
        // Change index.html path when production?
        let indexPath = path.resolve('index.html');
        let template = fs.readFileSync(
            indexPath,
            'utf-8'
        )
        // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
        //    also applies HTML transforms from Vite plugins, e.g. global preambles
        //    from @vitejs/plugin-react
        if (process.env.NODE_ENV != 'production') {
            template = await globals.vite.transformIndexHtml(url, template)
        }
        let file = view.replace('./', '') + '.tsx';// assuming .tsx
        let jsfiles = [];
        let stylePath = '/wui/style.scss';
        if (process.env.NODE_ENV == 'production') {
            let manifest = require(path.join(process.cwd(), 'dist', 'manifest.json'));
            stylePath = '/' + manifest["wui/style.scss"].file;
            let jsMan = manifest[file];
            if (jsMan.imports) {
                for (let r of jsMan.imports) {
                    jsfiles.push(manifest[r].file);
                }
            }
            jsfiles.push(jsMan.file);
        } else {
            jsfiles = [file];
        }
        template = renderMyHtml(template, {
            html: html,
            title: 'SSR',
            stylesheet: stylePath
        });

        let scripts = jsfiles.map(x => `<script type="module" src="/${x}"></script>`).join('')
        template = template.replace('</body>', `<script>var context = ${JSON.stringify(context)}</script>
        ${scripts}
        </body>`);
        return template;
    } catch (err) {
        console.error(err);
    }
    // let appHtml = await globals.vite.transformIndexHtml(url, `<!DOCTYPE html>${html}`);
    // const ret = await globals.vite.ssrLoadModule('wui/main.tsx');
    // const appHtml = await ret.render(url)
    // return appHtml;
}