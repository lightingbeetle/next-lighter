module.exports = ({ env }) => ({
  "vercel-deploy": {
    enabled: true,
    config: {
      deployHook: process.env.VERCEL_DEPLOY_PLUGIN_HOOK,
      apiToken: process.env.VERCEL_DEPLOY_PLUGIN_API_TOKEN,
      appFilter: process.env.VERCEL_DEPLOY_PLUGIN_APP_FILTER,
      teamFilter: process.env.VERCEL_DEPLOY_PLUGIN_TEAM_FILTER,
      roles: ["strapi-super-admin"],
    },
  },
  "preview-button": {
    config: {
      contentTypes: [
        {
          uid: "api::article.article",
          draft: {
            url: `${env("FRONTEND_URL")}/api/preview`,
            query: {
              slug: "{slug}",
              secret: env("STRAPI_PREVIEW_SECRET"),
            },
          },
          published: {
            url: `${env("FRONTEND_URL")}/blog/{id}/{slug}`,
          },
        },
      ],
    },
  },
});
