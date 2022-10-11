module.exports = ({ env }) => ({
  url: env("RENDER_EXTERNAL_URL"),
  dirs: {
    public: "/var/data/public",
  },
});
