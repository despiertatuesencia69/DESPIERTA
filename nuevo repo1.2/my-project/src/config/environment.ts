// src/config/environment.ts

export const environment = {
    appName: 'My Project',
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/myproject',
    // Other configuration settings can be added here
};