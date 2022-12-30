const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


  require('colors')



require('dotenv').config()



// middle were 

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{

    res.send("server is runing")
})



const uri = `mongodb+srv://${ process.env.DB_User}:${process.env.DB_Password}@cluster0.0vygy0s.mongodb.net/?retryWrites=true&w=majority`;

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

  try{
    const AbouteInfomr= client.db('aboute').collection('abouteEdit');
   
    const imgAndText = client.db('UploadedImg&Text').collection('UploadeImage');

    // img And  section
    app.get('/imgShowsT', async(req,res)=>{
     
      const quiry ={}
      const cursor =imgAndText.find(quiry).sort({role:1})
      const serviceData = await cursor.limit(3).toArray()
      res.send(serviceData)
      console.log(serviceData);
    })
    // img section  
    app.get('/imgShowsText', async(req,res)=>{
      const quiry ={}
      const cursor = await imgAndText.find(quiry)
      const imgData = await cursor.toArray()
      res.send(imgData)
      console.log(imgData);
    })

     app.post('/imageTextUploadeds',async(req,res)=>{
      const imgText = req.body
      const result = await imgAndText.insertOne(imgText)
    res.send(result) 
   
    })
     app.post('/loveLikes',async(req,res)=>{
     

      const {role,servise} = req.body
     const filter = {_id:ObjectId(servise)}
     const updateDocs = {
      $set:{
      role:role,
     
     }}
      const result = await imgAndText.insertOne(role).toArray()
      
    // res.send(result) 
    console.log(role,servise,"result",result);
   
    })
    // ----------------------------
    // Aboute section
    app.get('/about',async(req,res)=>{
      const quiry = {}
      const AbouteEdit = await AbouteInfomr.findOne(quiry)
      res.send(AbouteEdit)
      console.log(AbouteEdit);
    })


    app.put("/about",async(req,res)=>{  
    const {service,name,university,address}= req.body
    const filter = {_id:ObjectId(service)}
      const updateDocs = {
        $set:{
          name:name,
          university:university,       
            address:address
        },
      }
     
      const updateInformation = await AbouteInfomr.updateMany(filter,updateDocs)
    res.send(updateInformation)
     console.log("data",service,name,updateInformation);
     })


    // app.get('/service/:id', async(req,res)=>{
    //   const id= req.params.id;
    //   const query ={ _id:ObjectId(id)}
    //   const dataDetails = await UserServiceCollection.findOne(query) 
    //   res.send(dataDetails)
    // })

    // my riviews added 
//     app.get('/myreviews',async(req,res)=>{
// let query = {};
// if(req.query.email){
//   query={
//     email:req.query.email
//   }
// }
// const cursor = ReviesCollecton.find(query)
// const myreviess = await cursor.toArray()
// res.send(myreviess)
//     })

    // --------------
   

    
    // my service added
   
    // Revies 
   
    // app.post('/reviews',async(req,res)=>{
    //   const dataReview = req.body;
    //   const dataRev= await ReviesCollecton.insertOne(dataReview);
    //   res.send(dataRev)
    // })
 
    // app.get('/reviews',async(req,res)=>{
    //   const query= {}
    //   const cursor=  ReviesCollecton.find(query)
    //   const result =await cursor.toArray()
    //   res.send(result)
    // })


    // app.patch ('/reviews/:id',async(req,res)=>{
    //   const id= req.params.id;
    //   const review = req.body.review;
     

    //   const query = {_id:ObjectId(id)}
    //   console.log(query);
    //   const updateDocs={

    //     $set:{
    //       review:review

    //     }
        
    //   }
    //   const result = await ReviesCollecton.updateMany(query,updateDocs)
    //   res.send(result)
   
    // })

  }
  finally{

  }
}
run().catch(error=>{
  
})




app.listen(port,()=>{

    console.log(`sercer run ${port}`.bgRed);
})





