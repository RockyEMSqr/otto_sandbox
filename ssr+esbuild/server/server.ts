import { oexpress, router } from '@emsquared/otto_express';
import { createServer as createViteServer } from 'vite';
import globals from './globals';

(async () => {
    let app = oexpress({
        // publicFolders: ['./dist', './public'],
        port: 3000,
        // views: './server/views',
        // useSQliteFileStore: false,
        bodyParserJSONOptions: { limit: '50mb' },
        bodyParserUrlEncodedOptions: { limit: '50mb', parameterLimit: 50000 }
    });
    router(app, { controllers: './server/controllers' });
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
