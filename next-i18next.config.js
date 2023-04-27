const HttpApi = require('i18next-http-backend');

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'fr'],

        backend: {
            loadPath: `${process.env.I18N_RESOURCE_ROUTE}/locales/{{lng}}/{{ns}}.json`
        }
    },
    use: [HttpApi],
    serializeConfig: false,
    debug: true,
    ns: ['common']
}