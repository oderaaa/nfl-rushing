const router = require("express").Router();
const axios = require('axios');
const { sortBy } = require("underscore");
const STRING_VALUES = require('../../config/stringValues');
const DATA = require('../../set');

let rushingStats = DATA;

router.get("/", fetchRushingListFromApi(), (req, res, next) => {
    try{
        let listCopy = [...rushingStats];
        if (req.query.s){
            let s = req.query.s;
            if (s === STRING_VALUES.LNG){
                listCopy.sort(lngCompare);               
            }else if(s === STRING_VALUES.TD){
                listCopy.sort(tdCompare);
            }else if(s === STRING_VALUES.YDS){
                listCopy = sortBy(listCopy, STRING_VALUES.YDS).reverse();
            }
        }

        if(req.query.f){
            let f = req.query.f;
            listCopy = listCopy.filter(ele => ele.Player.toLowerCase().includes(f.toLowerCase()));          
        }
        res.json(paginatedList(req, listCopy));
    }catch (error){
        next(error);
    }
});

function lngCompare( a, b ) {

    let aLng = a.Lng;
    let bLng = b.Lng;

    if(typeof aLng === "string"){
        if(aLng.charAt(aLng.length-1) === 'T'){
            aLng = Number(aLng.substring(0, aLng.length - 1));
        }
    }

    if(typeof bLng === "string"){
        if(bLng.charAt(bLng.length-1) === 'T'){
            bLng = Number(bLng.substring(0, bLng.length - 1));
        }
    }
    
    if (Number(aLng) > Number(bLng)){
        return -1;
    }
    if (Number(aLng) < Number(bLng)){
        return 1;
    }    
     
    return 0;
}

function tdCompare(a,b){
    let aTD = a.TD;
    let bTD = b.TD;

    if(typeof aTD === "string"){
        aTD = Number(aTD)
    }

    if(typeof aTD === "string"){
        bTD = Number(bTD)
    }
    
    return bTD - aTD;
}

function fetchRushingListFromApi(){
    return async (req, res, next) => {
        try{
            if(rushingStats.length === 0){
                const  { data } = await axios.get(`https://api.sportsdata.io/v3/nfl/stats/json/PlayerSeasonStats/2020REG?key=3e91c820de3c4149835d198751efa295`);
                rushingStats =  data.map(item => ( {        
                                                        "Player": item.Name,
                                                        "Team": item.Team,
                                                        "Pos": item.Position,
                                                        "Att": item.RushingAttempts,
                                                        "Att/G": item.RushingAttempts/item.Played,
                                                        "Yds": item.RushingYards,
                                                        "Avg": item.RushingYardsPerAttempt,
                                                        "Yds/G": item.RushingYards/item.Played,
                                                        "TD": item.RushingTouchdowns,
                                                        "Lng": item.RushingLong,
                                                        "1st": "n/a",
                                                        "1st%": "n/a",
                                                        "20+": "n/a",
                                                        "40+": "n/a",
                                                        "FUM": item.Fumbles                                      
                                        }));
            }
            next();
        }catch(error){
            next(error);
        }
      
    }                                        
}

function paginatedList(req, model){
    try{
        const page = (parseInt(req.query.p))? Number(req.query.p): 1 ;
        const limit = (parseInt(req.query.l))? Number(req.query.l): 20;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit; 
        const results = {};
        
        if(endIndex < model.length){
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        
        if(startIndex > 0){
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        
        results.results = model.slice(startIndex, endIndex);
        
        return {response: results};          
    }catch(error){
        next(error);
    }
}

module.exports = router;