import { oexpress, router, setupController } from '@emsquared/otto_express';
import { createServer as createViteServer } from 'vite';
import globals from './globals';
import {HomeController} from './controllers/home'
import {AuthController} from './controllers/auth'
(async () => {
    let app = oexpress({
        // publicFolders: ['./dist', './public'],
        port: 3000,
        // views: './server/views',
        // useSQliteFileStore: false,
        useSessionFileStore:true,
        bodyParserJSONOptions: { limit: '50mb' },
        bodyParserUrlEncodedOptions: { limit: '50mb', parameterLimit: 50000 }
    });
    
    setupController(app, AuthController)
    app.use((req,res, next)=>{
        // @ts-ignore
        req.authenticatedUser = req.session.authenticatedUser;
        // @ts-ignore
        if(!req.authenticatedUser){
            return res.redirect('/auth/login')
        }
        next()
    })
    setupController(app, HomeController)
    // router(app, { controllers: './server/controllers' });
    const vite = await createViteServer({
        server: { middlewareMode: true },
        // appType: 'custom'
    })

    // use vite's connect instance as middleware
    // if you use your own express router (express.Router()), you should use router.use
    app.use(vite.middlewares)
    globals.vite = vite;


    app.start();
})()
