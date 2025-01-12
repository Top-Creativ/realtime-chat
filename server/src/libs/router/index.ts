class Router {
    public routes = new Map<string, Function>;

    public on(path: string, callback: Function) {
        this.routes.set(path, callback);
    }

    public use(namespace: string, child_route: Router) {
        child_route.routes.forEach((value, key) => {
            let ns = namespace;
            if(key != ""){
                ns += `.${key}`;
            }

            if(this.routes.has(ns)){
                throw new Error(`Route ${ns} already exists`);
            }

            this.routes.set(ns, value);
        });
    }
}

export default Router