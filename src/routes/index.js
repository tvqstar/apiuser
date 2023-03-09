const userRouter = require('./UserRouter');
const adminRouter = require('./AdminRouter')

const routes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/admin', adminRouter);
};

module.exports = routes;
