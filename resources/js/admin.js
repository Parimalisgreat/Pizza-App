import axios from 'axios'
import Noty from 'noty'
import moment from 'moment'


export function initAdmin(){
    const orderTableBody = document.querySelector('#orderTableBody')

    let orders = []

    let markup

    axios.get('/admin/orders',{
        headers:{
            "X-Requested-With":"XMLHttpRequest"
        }
    }).then(res=>{
        
        orders = res.data
        markup = generateMarkup(orders)
        orderTableBody.innerHTML = markup
    }).catch(err=>{
        console.log(err)
    })

    function renderItems(items) {
        let parsedItems = Object.values(items)
        return parsedItems.map((menuItem) => {
            return `
                <p>${ menuItem.item.name } - ${ menuItem.qty } pcs </p>
            `
        }).join('')
      }

    function generateMarkup(orders){
        return orders.map(order=>{
           return  `
                    <tr>
                    <td class="order-summary">
                        <p>${ order._id }</p>
                        <div>${ renderItems(order.items) }</div>
                    </td>
                    <td class="cust-name">${ order.customerId.name }</td>
                    <td class="cust-address">${ order.address }</td>
                    <td class="cust-status">
                        <div class="status">
                            <form action="/admin/order/status" method="POST">
                                <input type="hidden" name="orderId" value="${ order._id }">
                                <select name="status" onchange="this.form.submit()"
                                    class="status">
                                    <option value="order_placed"
                                        ${ order.status === 'order_placed' ? 'selected' : '' }>
                                        Placed</option>
                                    <option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>
                                        Confirmed</option>
                                    <option value="prepared" ${ order.status === 'prepared' ? 'selected' : '' }>
                                        Prepared</option>
                                    <option value="delivered" ${ order.status === 'delivered' ? 'selected' : '' }>
                                        Delivered
                                    </option>
                                    <option value="completed" ${ order.status === 'completed' ? 'selected' : '' }>
                                        Completed
                                    </option>
                                </select>
                            </form>
                            
                        </div>
                    </td>
                    <td class="date">
                        ${ moment(order.createdAt).format('hh:mm A') }
                    </td>
                    <td class="bill">
                        ${ order.paymentStatus ? 'paid' : 'Not paid' }
                    </td>
                </tr>
        `
        }).join('')
    }

}



// module.exports = initAdmin