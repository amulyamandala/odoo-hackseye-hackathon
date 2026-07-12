const app = require('./app');
const config = require('./config/env.config');
const connectDB = require('./database/connection');

connectDB();

app.listen(config.port, () => {
  console.log(`Server running in ${config.environment} mode on port ${config.port}`);
});
