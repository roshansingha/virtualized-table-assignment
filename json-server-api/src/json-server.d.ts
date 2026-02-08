declare module 'json-server' {
    import { Application, RequestHandler } from 'express';

    function create(): Application;
    function router(source: string | object, options?: any): RequestHandler & { db: any };
    function defaults(options?: any): RequestHandler[];
    function rewriter(routes: object): RequestHandler;
    const bodyParser: RequestHandler;

    export default {
        create,
        router,
        defaults,
        rewriter,
        bodyParser
    };
}
