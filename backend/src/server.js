const app = require('./app');
const db = require('./models');
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await db.sequelize.sync();
    console.log('Database synced successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
