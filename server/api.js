const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/ideas', require('./ideas'))
apiRouter.use('/meetings', require('./meetings'))
apiRouter.use('/minions', require('./minions'))


module.exports = apiRouter;
