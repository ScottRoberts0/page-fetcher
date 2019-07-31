const urlAndFile = process.argv.splice(2);
const url = urlAndFile[0];
const saveFile = urlAndFile[1];
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(urlAndFile);

const request = require('request');
const fs = require('fs');

request(url, (error, response, body) => {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.

  if (response.statusCode === 200) {
    if (fs.existsSync(saveFile)) {
      rl.question('File Exists, do you want to overwrite?', (answer) => {
        if (answer === "Y" || answer === "y") {
          fs.writeFile(saveFile, body, function (err) {
            if (err) throw err;
            console.log(`Downloaded and saved ${body.length} bytes to ${saveFile}`);
          });
        } else {
          console.log("Nothing written to files");
        }
        rl.close();
      });
    } else {
      rl.close();
      fs.writeFile(saveFile, body, function (err) {
        if (err) throw err;
        console.log(`Downloaded and saved ${body.length} bytes to ${saveFile}`);
      });
    }
     
  } else {
    if (error) {
      console.log("Error! Nothing Written to File", error);
    }

    if (response.statusCode !== 200) {
      console.log("Response code came back unsuccessful! Response code:", response.statusCode);
    }
    
  }

});




