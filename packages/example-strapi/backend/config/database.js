const path = require("path");

console.log(path.join(__dirname, "..", ".tmp/data.db"));

module.exports = ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: env(
        "DATABASE_FILENAME",
        path.join(__dirname, "..", "..", ".tmp/data.db")
      ),
    },
    useNullAsDefault: true,
  },
});
