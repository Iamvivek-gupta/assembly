const express = require('express');
const request = require('request');
const app = express();


app.get('/api/visitors',async (req,res) => {
    console.log(req.query);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let d = new Date(parseInt(req.query.date));
    let options = {
        method: 'GET',
        uri: 'https://data.lacity.org/resource/trxm-jn3c.json',
        headers: {
            'content-type': 'application/json'
            }
    }
    if(!req.query.ignore){
        console.log("ignore checking if block");
        request(options, function(error, response, body){
            let serverResponce = JSON.parse(body);
            //console.log(serverResponce)
            let result = serverResponce.filter(e => {
                console.log('e.month: ',new Date(e.month).getTime(),'v: ',req.query.date)
                if( new Date(e.month).getTime() == req.query.date){
                    console.log('matched!!');
                    return true;
                } else {
                    return false
                }})[0];
            if(!result){
                console.log("checking this block")
                return res.send({
                    status: 404,
                    message: 'details not found'
                })
            }
            delete result.month
            console.log(result)
            let arr = Object.values(result);
            let total = arr.reduce( (a,b) => parseInt(a) + parseInt(b));
            let min = Math.min(...arr);
            let max = Math.max(...arr);
            let maxKey = Object.keys(result).reduce(function(a, b){ return parseInt(result[a]) > parseInt(result[b]) ? a : b });
            let minKey = Object.keys(result).reduce(function(a, b){ return parseInt(result[a]) < parseInt(result[b]) ? a : b });
            let responseObject = {
                "attendance": {
                    "month": months[d.getMonth()],
                    "year": d.getFullYear(),
                    "highest": {
                        "museum": maxKey,
                        "visitors": max,
                    },
                    "lowest": {
                        "museum": minKey,
                        "visitors": min,
                    },
                    "total": total
                }
            }
            res.status(200).json(responseObject);
        })
    } else{
        console.log("ignore checking");
        request(options, function(error, response, body){
            let serverResponce = JSON.parse(body);
            //console.log(serverResponce)
            let result = serverResponce.filter(e => {
                if(new Date(e.month).getTime() == req.query.date && e.hasOwnProperty(req.query.ignore)){
                    return true;
                } else {
                    return false;
                }
            })[0];
            if(!result){
                return res.send({
                    status: 404,
                    message: 'details not found'
                })
            }
            delete result.month
            console.log(result)
            let arr = Object.values(result);
            let total = arr.reduce( (a,b) => parseInt(a) + parseInt(b));
            let min = Math.min(...arr);
            let max = Math.max(...arr);
            let maxKey = Object.keys(result).reduce(function(a, b){ return parseInt(result[a]) > parseInt(result[b]) ? a : b });
            let minKey = Object.keys(result).reduce(function(a, b){ return parseInt(result[a]) < parseInt(result[b]) ? a : b });
            let ignoreVisitor = result[req.query.ignore];
            console.log(ignoreVisitor);
            let responseObject = {
                "attendance": {
                    "month": months[d.getMonth()],
                    "year": d.getFullYear(),
                    "highest": {
                        "museum": maxKey,
                        "visitors": max,
                    },
                    "lowest": {
                        "museum": minKey,
                        "visitors": min,
                    },
                    "ignore": {
                        "museum": req.query.ignore,
                        "visitors": ignoreVisitor,
                    },
                    "total": total
                }
            }
            res.status(200).json(responseObject);
        })
    }
});




const PORT = 3001;
app.listen(PORT, () => {
    console.log("server is up on port " + PORT);
});