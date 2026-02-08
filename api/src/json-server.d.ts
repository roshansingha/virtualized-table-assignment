declare module 'json-server' {
    import { Express, RequestHandler } from 'express';

    interface JsonServerRouter {
        db: any;
        render: (req: any, res: any) => void;
    }

    interface JsonServer {
        create(): Express;
        router(source: string | object, options?: any): JsonServerRouter;
        defaults(options?: any): RequestHandler[];
        rewriter(routes: object): RequestHandler;
        bodyParser: RequestHandler;
    }

    const jsonServer: JsonServer;
    export default jsonServer;
}
