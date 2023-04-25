import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
} from 'discord-interactions';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const https = require("https");
const cheerio = require("cheerio");

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));


/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    //if "fj-random" command
    function getEmbedObject(){
      return new Promise( (resolve, reject) => {
        getUrl().then( (pageUrl) => {
          https.get(pageUrl, (response) => {
            let pageData = ``;
            response.on(`data`, (chunk) =>{
              pageData += chunk;
            });
            response.on(`end`,()=>{
              //using cheerio to parse the html dom, it has jquery like syntax so $
              const $ = cheerio.load(pageData);
              
  
  
              
              let object = {
                title: $(`h1.contentTitle:first`).text(),
                url: pageUrl,
                image: {
                  url: $(`div.contentImage img:first`).attr(`src`),
                  height: 100,
                  width: 100,
                },
              };
              resolve(object);
              
            });
          }).on(`error`, (error)=>{
            console.error(error);
            reject("error")
          })
        })





      });
    }

    function getUrl(){
      return new Promise( (resolve, reject) => {

      https.get(`https://funnyjunk.com/random`, (response) => {
        //const pageUrl = response.headers.location; 
        const pageUrl = `https://funnyjunk.com`

        https.get(pageUrl, (response) => {
          let pageData = ``;
          response.on(`data`, (chunk) =>{
            pageData += chunk;
          });
          response.on(`end`,()=>{
            //using cheerio to parse the html dom, it has jquery like syntax so $
            const $ = cheerio.load(pageData);
            
            let urlList = [];
            let uniqueUrlList = [];
            $("a").each(function(index, element) {
              const url = $(element).attr("href");
              //only push unique urls.
              if(urlList.indexOf(url) === -1){
                urlList.push(url);
              }
            });
            //filterning out non post urls.
            uniqueUrlList = urlList.filter((url)=>{
              if (url === undefined 
                || url.indexOf("channel") != -1
                || url.indexOf("movies") != -1
                || url.indexOf("funny") != -1
                || url.indexOf("user") != -1
                || url.indexOf("member") != -1
                || url.indexOf("directory") != -1
                || url.indexOf("#") != -1
                || url.indexOf("contact") != -1
                || url.indexOf("copyright") != -1
                || url.indexOf("advertise") != -1
                || url.indexOf("Inch") != -1
                || url.length < 5
              
              ){
                return false;
              }
             return true;
            }
            );
            function giveRandomUrl(urlList){
              for(let x = urlList.length - 1; x > 0; x--){
                const y = Math.floor(Math.random() * (x + 1));
                [urlList[x], urlList[y]] = [urlList[y], urlList[x]];
              }
              return urlList[0];
            }


            
            const url = pageUrl + giveRandomUrl(uniqueUrlList);
            resolve(url);
            
          });
        }).on(`error`, (error)=>{
          console.error(error);
          reject("error")
        })


      }).on(`error`, (error)=>{
        console.error(error);
        reject("error")
      })
      });
    }


    if (name === "fj-random"){
      let contentTitle = `unset`;
      let contentUrl = `unset`;
      let contentImage = "unset";

      getEmbedObject().then( (object) => {
        contentTitle = object.title;
        contentUrl = object.url;
        contentImage = object.image;
        

        return res.send({
          type: 4,
          data: {
            embeds: [{
              title: contentTitle,
              url: contentUrl,
              description: "A random Top Funnyjunk page.",
              image: contentImage,
              
            }]
          }
        })
      }).catch( (error) => {
        console.log(error);
      });

    }
  }
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
