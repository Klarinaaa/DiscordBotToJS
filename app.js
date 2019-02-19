const discord = require('Discord.js');
const EmbedMsg = require('Discord.js');
const client = new discord.Client();
const Nodegeocoder = require('node-geocoder');
const request = require('request')

var geoOptions = {
  provider: 'google',
  apiKey: '' // Google API Token NOTE: Weather Will not work without this
}
var geoCoder = Nodegeocoder(geoOptions);

 // API Keys //
var token = ""; // Google API Token NOTE: Weather Will not work without this
var wToken = ""; // Weather Unlocked Token: Weather Will Not work without this

// login the Bot //
client.login(token);

// Intialises The bot //
client.on('ready', async () => {
  console.log('Logged In');
  client.user.setPresence({ game: { name: 'Drinking Milo'}, status: 'online'}).then(console.log())
  client.user.setName
});

// Message Reading //
client.on('message', msg  => {

  var strCmd = msg.content.split(/[\s]/);
  switch (strCmd[0]) {

    case "!ping":
    msg.channel.send("Pong")  // Tests If the bot is functioning and can send messages to the channel
    break;

    case "!help": // Displays the Help Command Detailing all commands
    msg.channel.send({ embed:
      {
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Help Menu",
      description: "I provide Assistance to Discord Servers, Here is what I can do \
      perform",
      fields: [{
        name: "!ping",
        value: "Sends you a pong back !"
      },
      {
        name: "!weather (Location)",
        value: "Gives you the weather at the location in Celcius"
      },
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "Bot made by Klarina"
        }
      }
    })
    break;

    case "!weather": // Displays the Weather of a given location
    geoCoder.geocode(strCmd[1], function(err,res){
      if (res) {
        var lat = res[0].latitude
        var long = res[0].longitude
        request("http://api.weatherunlocked.com/api/current/" + lat + "," + long + wToken, { json: true}, (err,res,body) => {
          msg.channel.send("The Current Weather in " + strCmd[1] + " Is " + res.body.wx_desc + " with a temperature of " + res.body.temp_c + "C")
        })
      }
    })
    break;

    case "!random":
    var number = Math.floor((Math.random() * 100 ) + 1);
    msg.channel.send("Your random number is " + number); // Generates a Random Number between 1 - 100
    break;

  }
})
