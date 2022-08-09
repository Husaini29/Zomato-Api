let express = require('express');
let app = express();
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let bodyParser = require('body-parser');
let cors = require('cors');
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 8858;
let db;
// let MongoUrl = process.env.MongoUrl;
let MongoLiveUrl = process.env.MongoLiveUrl;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

// First route Api
app.get('/',(req,res) => {
    res.send('Zomato Node Server ')
})

// Api of Cities
app.get('/location', (req,res)=>{
    db.collection('location').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})


// Api of Restaurants w.r.t city/mealId
app.get('/restaurants', (req,res)=>{
    let stateId=Number(req.query.state_id);
    let mealId=Number(req.query.mealtype_id);
    let query = {};
    
    if(stateId && mealId){
        query = {"mealTypes.mealtype_id":mealId,state_id:stateId};
    }
    else if(mealId){
        query = {"mealTypes.mealtype_id":mealId};
    }
    else if(stateId){
        query = {state_id:stateId};
    }
    console.log("StateId>>>>>", stateId);
    console.log("mealId>>>>>", mealId);
    db.collection('restaurants').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})


// Api of Restaurants w.r.t mealType
app.get('/mealType',(req,res)=>{
    db.collection('mealType').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

// Filter Api
app.get('/filter/:mealId',(req,res)=>{
    let sort = {cost:1};
    let skip = 0;
    let limit = 1000000000000;
    let mealId = Number(req.params.mealId);
    let cuisineId = Number(req.query.cuisine);
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    let query={};

    if(req.query.sort){
        sort= {cost:req.query.sort}
    }
    if(req.query.skip && req.query.limit){
        skip = Number(req.query.skip);
        limit = Number(req.query.limit);
    }
    if(cuisineId && lcost && hcost){
        query={"cuisines.cuisine_id":cuisineId,
        "mealTypes.mealtype_id":mealId,
        $and:[{cost:{$gt:lcost,$lt:hcost}}]}
    }
    else if(cuisineId){
        query = {"cuisines.cuisine_id":cuisineId,"mealTypes.mealtype_id":mealId};
    }
    else if(lcost && hcost){
        query= {$and:[{cost:{$gt:lcost,$lt:hcost}}],"mealTypes.mealtype_id":mealId};
    }
    
    db.collection('restaurants').find(query).sort(sort).skip(skip).limit(limit).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// Restaurant details Api
app.get('/details/:id',(req,res)=>{
    let restId = Number(req.params.id);
    db.collection('restaurants').find({restaurant_id:restId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// Api for Menu w.r.t Restaurants
app.get('/menu/:id',(req,res)=>{
    let restId = Number(req.params.id);
    db.collection('menu').find({restaurant_id:restId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

//Place order(s)
app.post('/placeOrder',(req,res)=>{
    db.collection('orders').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Order Added.");
    })
})

// Menu Items Based on User's Selection
app.post('/menuItem',(req,res)=>{
    db.collection('menu').find({menu_id:{$in:req.body}}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// List of all orders
app.get('/orders',(req,res)=>{
    let email = req.query.email;
    let query = {};
    if(email){
        query = {"email":email};
    }

    db.collection('orders').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// Update Order(s)
app.patch('/updateOrder/:id',(req,res)=>{
    let oId = Number(req.params.id);
    let status = req.body.status?req.body.status:'Pending'
    db.collection('orders').updateOne(
        {id:oId},
        {$set:{
            "status":status,
            "bank_name":req.body.bank_name,
            "bank_status":req.body.bank_status,
            "date":req.body.date
        }}
        ,(err,result)=>{
        if(err) throw err;
        res.send(`Status Updated to ${status}`);
    })
})

// Delete order(s)
app.delete('/deleteOrder',(req,res)=>{
    db.collection('orders').remove({}, (err,result)=>{
        if(err) throw err;
        res.send("Orders Deleted.");
    })
}) 

// Database Connection 

MongoClient.connect(MongoLiveUrl,(err,client) => {
    if(err) console.log("Error While Connecting");
    db = client.db('Zomato_API');
    app.listen(port,(err) => {
        if(err) throw err;
        console.log(`Express Server Running on Port ${port}`);
    })
})