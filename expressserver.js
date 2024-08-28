import app from './app.js';

const server = app.listen(8081, () => {
    console.log(`Server is running on port 8081`);
});

export default server;

