# assembly

Instruction to clone the following repo

1. clone the repository using following command:
git clone https://github.com/Iamvivek-gupta/assembly.git

2. download the node_modules: 
npm install

3. to start the put command:
npm start 
server is running on PORT 3001

4. now we are ready to getting API responce

i) http://localhost:3001/api/visitors?date=1627756200000

will get responce as 

{"attendance":
  { "month":"August",
    "year":2021,
    "highest":
      { "museum":"avila_adobe",
        "visitors":6214
      },
    "lowest":
      { "museum":"biscailuz_gallery",
         "visitors":0
      },
     "total":10604
   }
}


ii) http://localhost:3001/api/visitors?date=1627756200000&ignore=avila_adobe
 will get responce as
 
 {
  "attendance":
    {
      "month":"August",
      "year":2021,
      "highest":
        {
          "museum":"avila_adobe",
          "visitors":6214
        },
      "lowest":
         {
          "museum":"biscailuz_gallery",
          "visitors":0
         },
       "ignore":
          {
            "museum":"avila_adobe",
            "visitors":"6214"
          },
        "total":10604
      }
 }
