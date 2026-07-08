import app from "./app";
import config from "./config";

const startServer = () => {
  app.listen(config.port, () => {
    console.log(`FixItNow API server running on port ${config.port}`);
    console.log(`Environment: ${config.nodeEnv}`);
    console.log(`Health check: http://localhost:${config.port}/health`);
  });
};

startServer();
