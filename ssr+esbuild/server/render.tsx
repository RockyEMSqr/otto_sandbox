// import { renderToString } from "preact-render-to-string";
import renderToString from "preact-render-to-string";
import { App } from "../wui/app";
// import { Layout } from "../wui/pages/layout";
import { h } from 'preact';
import type { Request } from 'express';
import 'vite';
import globals from "./globals";
import fs from 'fs'
import path from 'path'
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
        if (process.env.NODE_ENV = 'prodduction') {
            indexPath = path.resolve('dist/index.html');
        }
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
        template = template.replace('App Here', html);
        // 3. Load the server entry. vite.ssrLoadModule automatically transforms
        //    your ESM source code to be usable in Node.js! There is no bundling
        //    required, and provides efficient invalidation similar to HMR.
        // const ret = await globals.vite.ssrLoadModule('./wui/main.tsx')

        // 4. render the app HTML. This assumes entry-server.js's exported `render`
        //    function calls appropriate framework SSR APIs,
        //    e.g. ReactDOMServer.renderToString()
        // const appHtml = await ret.render(url);
        template = template.replace('</body>', `<script>var context = ${JSON.stringify(context)}</script></body>`);
        return template;
    } catch (err) {
        console.error(err);
    }
    // let appHtml = await globals.vite.transformIndexHtml(url, `<!DOCTYPE html>${html}`);
    // const ret = await globals.vite.ssrLoadModule('wui/main.tsx');
    // const appHtml = await ret.render(url)
    // return appHtml;
}