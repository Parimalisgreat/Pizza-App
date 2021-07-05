const Order=require('../../../models/order')

function statusController(){
    return {
        update(req,res){

             Order.updateOne({_id:req.body.orderId},{status:req.body.status},(err,data)=>{
                
                if(err){
                    req.flash('error',"Something went wrong")
                    return res.redirect('/admin/orders')
                }
                return res.redirect('/admin/orders')
             })
        }

    }
}

module.exports = statusController