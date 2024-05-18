import {CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME} from "src/shared/constants/url.constants";

export default () => ({
    nodemailerTransporterConfig: {
        transport: {
            host: 'smtp.gmail.com',
            secure: false,
            // port: 465,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        },
        defaults: {
            from: '"No Reply" <noreply@example.com>',
        },
    },
    jwtExpires: {
        _30days: {
            exp: '30d',
            expIncrement: 2592000000,
        },
        _30Seconds: {
            exp: '30s',
            expIncrement: 30000,
        },
        _60Seconds: {
            exp: '60s',
            expIncrement: 60000,
        },
        _300Seconds: {
            exp: '300s',
            expIncrement: 300000,
        },
        _200Seconds: {
            exp: '200s',
            expIncrement: 200000,
        },
        _100Seconds: {
            exp: '100s',
            expIncrement: 100000,
        },
        _1hour: {
            exp: '1h',
            expIncrement: 3600000,
        },
    },
    cloudinary: {
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
        secure: true,
    },
    test1: 'testConf',
});
