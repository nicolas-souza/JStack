const {Router, next} = require('express');
const CategoryController = require('./app/controllers/categoryController');

const ContactController = require('./app/controllers/ContactController')

const router = Router();

router.get('/contacts',
    (request, response, next) => {
        next(); //prossegue a leitura de middleware
    },
    ContactController.index
);

router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts/', ContactController.store);
router.put('/contacts/:id', ContactController.update);

router.get('/categories', CategoryController.index)
router.get('/categories/:id', CategoryController.show);
router.post('/categories', CategoryController.store)
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.delete);

module.exports = router
