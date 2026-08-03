import app from "./app.js";
import config from "./config/index.js";
import { ensureDefaults } from "./lib/ensure-defaults.js";

const startServer = async () => {
  // On Vercel the app is exported as a serverless function — do not listen.
  if (process.env.VERCEL) return;

  try {
    await ensureDefaults();
    console.log("Default accounts ready (admin@fixitnow.com / Admin@1234)");
  } catch (err) {
    console.error("Failed to ensure default accounts:", err);
  }

  const port = Number(config.port) || 5000;
  app.listen(port, () => {
    console.log(`FixItNow API server running on port ${port}`);
    console.log(`Environment: ${config.nodeEnv}`);
    console.log(`Health check: http://localhost:${port}/health`);
  });
};

startServer();

export default app;
