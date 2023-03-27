const express = require('express')
const app = express()
const { CFConfig, CFPaymentGateway, CFEnvironment } = require ("cashfree-pg-sdk-nodejs")
const axios = require('axios');

app.get('/payment', (req, res) =>{
    try{
        
        let axiosConfig = {
            headers : {
                'Content-Type': 'application/json',
                'x-api-version': '2022-09-01',
                'x-client-id': '',
                'x-client-secret': '',
            }
        };
        
        
        data = {
            'order_id': 'order_1626945143541',
            'order_amount': 10.12,
            'order_currency': 'INR',
            'order_note': 'Additional order info',
            'customer_details': {
                'customer_id': '12345',
                'customer_name': 'name',
                'customer_email': 'care@cashfree.com',
                'customer_phone': '9816512345',
            },
        }
        axios.post('https://sandbox.cashfree.com/pg/orders', data, axiosConfig)
        .then((resp) => {
          console.log("RESPONSE RECEIVED: ", resp.data);
          res.redirect(resp.data.payments.url)
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })

    }catch(error){
        console.log(error)
    }
})

app.listen(3000,()=>{
    console.log("Server working")
})