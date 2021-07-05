const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const homeController = require('../app/http/controllers/homeController');
const orderController=require('../app/http/controllers/customers/orderController')
const AdminOrderController=require('../app/http/controllers/admin/orderController');
const StatusController=require('../app/http/controllers/admin/statusController');

//Middlewares
const admin = require('../app/http/middleware/admin');
const guest= require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')

function initRoutes(app){
    app.get('/', homeController().index)

    app.get('/cart',cartController().index)
    
    app.get('/login',guest,authController().login)

    app.post('/login',authController().postLogin)
    
    app.get('/register',guest,authController().register)

    app.post('/register',authController().postRegister)

    app.post('/logout',authController().logout)

    app.post('/update-cart',cartController().update)
    

    //Customer routes

    app.post('/orders',auth,orderController().store)

    app.get('/customer/orders',auth, orderController().index)

  
    app.get('/customer/orders/:id',auth,orderController().show)

    //admin order status
    app.post('/admin/order/status',admin,StatusController().update)

    //Admin routes

    app.get('/admin/orders',admin,AdminOrderController().index)

}

module.exports = initRoutes;