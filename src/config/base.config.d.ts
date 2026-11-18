declare const _default: () => {
    nodemailerTransporterConfig: {
        transport: {
            host: string;
            secure: boolean;
            auth: {
                user: string;
                pass: string;
            };
        };
        defaults: {
            from: string;
        };
    };
    jwtExpires: {
        _30days: {
            exp: string;
            expIncrement: number;
        };
        _30Seconds: {
            exp: string;
            expIncrement: number;
        };
        _60Seconds: {
            exp: string;
            expIncrement: number;
        };
        _300Seconds: {
            exp: string;
            expIncrement: number;
        };
        _200Seconds: {
            exp: string;
            expIncrement: number;
        };
        _100Seconds: {
            exp: string;
            expIncrement: number;
        };
        _1hour: {
            exp: string;
            expIncrement: number;
        };
        _8hour: {
            exp: string;
            expIncrement: number;
        };
    };
    cloudinary: {
        cloud_name: string;
        api_key: string;
        api_secret: string;
        secure: boolean;
    };
    test1: string;
};
export default _default;
