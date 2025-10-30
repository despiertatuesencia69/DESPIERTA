import express from 'express';
import { config } from './config/environment';
import routes from './routes'; // Assuming you will create a routes file later

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes setup
app.use('/api', routes);

// Start the server
const PORT = config.port || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;