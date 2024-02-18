// autogenerate require
const swaggerAutogen = require("swagger-autogen");

// cretae a document info
const doc = {
  info: {
    title: "Username Api",
    description: "Project Two - Username Api",
  },
  host: "https://second-project-u3l2.onrender.com",
  schemes: ["https", "http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
