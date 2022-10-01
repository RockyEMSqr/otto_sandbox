import { oexpress, router, setupController } from '@emsquared/otto_express';
import { createServer as createViteServer } from 'vite';
import globals from './globals';
import { HomeController } from './controllers/home'
import { AuthController } from './controllers/auth'
import express from 'express';
import path from 'path'
(async () => {
    let app = oexpress({
        // publicFolders: ['./assets', './public'],
        port: 3000,
        // views: './server/views',
        // useSQliteFileStore: false,
        useSessionFileStore: true,
        bodyParserJSONOptions: { limit: '50mb' },
        bodyParserUrlEncodedOptions: { limit: '50mb', parameterLimit: 50000 }
    });
    const fs = require('fs') // this engine requires the fs module
    app.engine('ntl', (filePath, options:any, callback) => { // define the template engine
        fs.readFile(filePath, (err:any, content:any) => {
            if (err) return callback(err)
            // this is an extremely simple template engine
            const rendered = content.toString()
                .replace('#title#', `<title>${options.title}</title>`)
                .replace('#message#', `<h1>${options.message}</h1>`)
            return callback(null, rendered)
        })
    })
    app.set('views', './views') // specify the views directory
    app.set('view engine', 'ntl') // register the template engine
    if (process.env.NODE_ENV !== 'production') {
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'custom'
        })

        // use vite's connect instance as middleware
        // if you use your own express router (express.Router()), you should use router.use
        app.use(vite.middlewares)
        globals.vite = vite;
    }




    app.use('/assets', express.static(path.join(process.cwd(), '/dist/assets')));
    setupController(app, AuthController)
    app.use((req, res, next) => {
        // @ts-ignore
        req.authenticatedUser = req.session.authenticatedUser;
        // @ts-ignore
        if (!req.authenticatedUser) {
            return res.redirect('/auth/login')
        }
        next()
    })
    setupController(app, HomeController)
    // router(app, { controllers: './server/controllers' });



    app.start();
})()
