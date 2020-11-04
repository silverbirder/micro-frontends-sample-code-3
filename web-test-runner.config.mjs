import { importMapsPlugin } from "@web/dev-server-import-maps";

export default {
    plugins: [
        importMapsPlugin({
            inject: {
                importMap: {
                    imports: {
                        "./../../zen-observable": "/node_modules/zen-observable/index.js",
                        "./../../zen-observable/": "/node_modules/zen-observable/",
                    },
                },
            },
        }),
    ],
};
