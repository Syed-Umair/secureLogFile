// var crypto = require("crypto");
// var path = require("path");

// var encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
//   var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
//   var publicKey = fs.readFileSync(absolutePath, "utf8");
//   var buffer = new Buffer(toEncrypt);
//   var encrypted = crypto.publicEncrypt(publicKey, buffer);
//   console.log(encrypted.toString("base64"));
//   return encrypted.toString("base64");
// };

// var decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
//   var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
//   var privateKey = fs.readFileSync(absolutePath, "utf8");
//   var buffer = new Buffer(toDecrypt, "base64");
//   var decrypted = crypto.privateDecrypt({
//     key: privateKey,
//     passphrase: "logger2017"
//   }, buffer);
//   return decrypted.toString("utf8");
// };

var ursa = require('ursa');
var fs = require("graceful-fs");
var publicKey = ursa.createPublicKey(fs.readFileSync("./public.pem"));
var privateKey = ursa.createPrivateKey(fs.readFileSync("./private.pem"), "logger2017");

fs.readFile("./main.log", function(err, text) {
  text
    .toString("utf8")
    .split("\n")
    .forEach(function(element) {
      fs.appendFileSync("./encMain.log", publicKey.encrypt(element, "utf8", "base64").concat("\n"), "utf8");
    });
});

// fs.readFile("./encMain.log", function(err, text) {
//   text
//     .toString("utf8")
//     .split("\n")
//     .forEach(function(element) {
//       if (element)
//         fs.appendFileSync("./decMain.log", privateKey.decrypt(element, "base64", "utf8").concat("\n"), "utf8");
//     });
// });