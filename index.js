const express = require('express')
const port = 3000;
const uuid = require('uuid')

const app = express()
app.use(express.json())

const orders = []


app.get('/order', (request, response) => {
    return response.json(orders)
})

app.post('/order', (request, response) => {
    const { order, clienteName, price } = request.body

    const ord = { id:uuid.v4(), order, clienteName, price, status: "Em preparação" }

    orders.push(ord)

    return response.status(201).json(ord)
})

app.put('/order/:id', (request, response) => {
     const { id } = request.params
     const { order, clienteName, price} = request.body

     const updateOrder = { order, clienteName, price}

     const index = orders.findIndex( ord => ord.id === id )

     if(index < 0){
         return response.status(404).json({ message: "Order not found"})
     }

     updateOrder.status = orders[index].status
     
     orders[index] = updateOrder

    return response.json(updateOrder)
})

app.delete('/order/:id', (request, response) => {
    const { id } = request.params

    const index = orders.findIndex( ord => ord.id === id )

     if(index < 0){
         return response.status(404).json({ message: "Order not found"})
     }

     orders.splice(index,1)

    return response.status(204).json()
})

app.get('/order/:id', (request, response) => {
    const { id } = request.params

    const index = orders.findIndex( ord => ord.id === id )

     if(index < 0){
         return response.status(404).json({ message: "Order not found"})
     }

     return response.json(orders[index])
})

app.patch('/order/:id', (request, response) => {
    const { id } = request.params

    const index = orders.findIndex( ord => ord.id === id )

     if(index < 0){
         return response.status(404).json({ message: "Order not found"})
     }

     orders[index].status = "Pronto"

     return response.json(orders[index])
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})