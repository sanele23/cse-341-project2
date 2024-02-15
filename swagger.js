// autogenerate require
const swaggerAutogen = require("swagger-autogen");

// cretae a document info
const doc = {
  info: {
    title: "Username Api",
    description: "Username Api",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
