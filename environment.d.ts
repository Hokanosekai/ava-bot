declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string,
            APP_ENV: 'dev' | 'live',
        }
    }
}

export {}