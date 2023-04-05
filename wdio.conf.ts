import type { Options } from '@wdio/types'

export const config: Options.Testrunner = {

    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },

    port: 4723,

    path: '/',

    specs: [
        './features/**/*.feature'
    ],

    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 1,

    capabilities: [{
        maxInstances: 1,
        'appium:deviceName': 'emulator-5554',
        'platformName': 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': 'com.kickstarter.kickstarter.debug',
        'appium:appActivity': 'com.kickstarter.ui.activities.DiscoveryActivity',
        'appium:platformVersion': '13'
    }],
    logLevel: 'error',

    bail: 0,

    baseUrl: 'http://localhost',

    waitforTimeout: 30000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    framework: 'cucumber',

    reporters: ['spec'],

    cucumberOpts: {
        require: ['./features/step-definitions/steps.ts'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: '',
        // <number> timeout for step definitions
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    }
};

config.services = [
    [
        'appium', {
            command: 'appium',
            args: {
                relaxedSecurity: true,
                address: 'localhost',
                port: 4723,
                log: './appium.log',
            },
        },
    ],
];
