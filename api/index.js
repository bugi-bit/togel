var express = require('express');
var e = express.Router();

// load pre-trained model
const model = require('./sdk/model.js');
const cls_model = require('./sdk/cls_model.js');

// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '1825016672:AAFVtA4QKSCzQdRfOz5pYMGYACjl_8xxwS0'
const bot = new TelegramBot(token, {polling: true});

// routers
e.get('/classify/:i/:r', function(req, res, next) {    
    model.predict(
        [
            parseFloat(req.params.i), // string to float
            parseFloat(req.params.r)
        ]
    ).then((jres)=>{
        cls_model.classify(
            [
                parseFloat(req.params.i), // string to float
                parseFloat(req.params.r),
                parseFloat(jres[0]),
                parseFloat(jres[1])
        ]
        ).then((jres_)=>{
        res.json({jres, jres_})
    })
    })
});

module.exports = e;

state = 0;
// bots
bot.onText(/\/start/, (msg) => { 
       bot.sendMessage(
        msg.chat.id,
        `Hallo ${msg.chat.first_name}, Selamat datang di bot klasifikasi dan prediksi radius shaping\n
        click /predict untuk mulai`
    );  
    state = 0;
});

bot.onText(/\/predict/, (msg) => { 

    bot.sendMessage(
        msg.chat.id,
        `Masukan nilai radius kanan|kiri contohnya 215|215`
    );   
    state = 1
});
bot.on('message', (msg) => {
    if(state == 1){
        
        s = msg.text.split("|");   
        model.predict(
        [
           parseFloat(s[0]),
           parseFloat(s[1])
        ]
        ).then((jres1)=>{
            console.log(jres1);
          
              cls_model.classify([parseFloat(s[0]),parseFloat(s[1]), parseFloat(jres1[0]),parseFloat(jres1[1])]).then((jres2) => {
                bot.sendMessage(
                    msg.chat.id,
                    `Nilai Radius Kanan ${s[0]} mm`
        );
                bot.sendMessage(
                    msg.chat.id,
                    `Nilai Radius Kiri ${s[1]} mm`
        );       
                bot.sendMessage(
                    msg.chat.id,
                    `Nilai Presure yang diprediksi adalah ${jres1[0]} kg/cm2`
        ); 
                bot.sendMessage(
                    msg.chat.id,
                    `Nilai Radius yang diprediksi adalah ${jres1[1]} mm`
        );
                 bot.sendMessage(
                    msg.chat.id,
                    `Klasifikasi Radius Shaping ${jres2}`
                     
                 );
            })
        })
    }else{
     
    state = 0;
    }
})


