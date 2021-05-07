module.exports = {
    devkit: {
        commands: {
            dev: {
                builder: "feflow-devkit-xbc-webpack4:dev",
                options: {
                    isMinicss: false,
					port: 7700
                },
            },
            test: {
                builder: "feflow-devkit-xbc-webpack4:test",
                options: {
					isMinicss: true,
                }
            },
            formalTest: {
                builder: "feflow-devkit-xbc-webpack4:formalTest",
                options: {
					isMinicss: true,
                }
            },
            demo: {
                builder: "feflow-devkit-xbc-webpack4:demo",
                options: {
					isMinicss: true,
                }
            },
            build: {
                builder: "feflow-devkit-xbc-webpack4:build",
                options: {
					isMinicss: true,
					externals: [
						{
							optionsId: 100,
							module: "vue",
							entry: "../../static/js/vue2.5.2.min.js",
							global: "Vue"
						},
					],
                }
            }
        },
        commons: {
            entry: "index.tsx",
            isModule: false,
            isMinicss: true,
            hasAnalyzer: false,
            analyzer: {
                "analyzerPort": 3479
            },
			port: 1234,
			alias: {
				"@": "src",
			},
            externals: [
				{
					optionsId: 100,
                    module: "vue",
                    entry: "../../static/js/vue2.5.2.js",
                    global: "Vue"
				},
				{
                    module: "element-ui",
                    entry: "../../static/js/element-ui2.13.2.min.js",
                    global: "ELEMENT"
                },
			],
            envs: {
                dev: {
                    envObj: {
                        NODE_ENV: "'development'",
						API_HOST: "'http://localhost:3333'",		//开发环境
                    	SJY_URL: "'http://localhost:3333'",
						HEHE_URL: "'http://localhost:3333'",
						API_HOST_H5: "'http://localhost:3333'",	//H5开发环境
                        API_IMG: "'http://localhost:3333'",         //图片服务器开发环境
                    }
                },
                test: {
                    envObj: {
                        NODE_ENV: "'test'",
						API_HOST: "'http://192.168.16.103:9921'",
                    	SJY_URL: "'http://192.168.16.9:9000'",
						HEHE_URL: "'http://192.168.16.9:9001'",
						API_HOST_H5: "'http://192.168.16.103:9921'",
						API_IMG: "'http://192.168.16.103:9921'"
                    }
                },
                formalTest: {
                    envObj: {
                        NODE_ENV: "'formalTest'",
						API_HOST: "'http://192.168.16.8:9921'",
                    	SJY_URL: "'http://192.168.16.9:9000'",
						HEHE_URL: "'http://192.168.16.9:9001'",
						API_HOST_H5: "'http://192.168.16.8:9921'",
						API_IMG: "'http://192.168.16.8:9921'"
                    }
                },
                demo: {
                    envObj: {
                        NODE_ENV: "'demo'",
						API_HOST: "'http://192.168.16.8:9921'",
                    	SJY_URL: "'http://192.168.16.9:9000'",
						HEHE_URL: "'http://192.168.16.9:9001'",
						API_HOST_H5: "'http://192.168.16.8:9921'",
						API_IMG: "'http://192.168.16.8:9921'"
                    }
                },
                build: {
                    envObj: {
                        NODE_ENV: "'production'",
						API_HOST: "'http://mmj.batargold.com/'",
                    	SJY_URL: "'http://192.168.16.9:9000'",
						HEHE_URL: "'http://192.168.16.9:9001'",
						API_HOST_H5: "'http://mmj.batargold.com/'",
						API_IMG: "'http://mmj.batargold.com/'"
                    }
                }
            }
        }
    }
}
