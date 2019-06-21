var watermark = require("watermark");
var fs = require('file-system');

function stamper() {
    // watermark by local path

    for (var i = 1; i < 5; i++) {
        watermark([`images/inputPics/catBeard${i}.jpeg`, 'images/inputPics/Tech_Discounts_Logo.png'])
            .image(watermark.image.lowerRight(0.5))
            .then(img =>   fs.writeFile(`images/inputPics/catBeard${ i }.jpeg`, 'aaa', function(err) {console.log("Uh oh!")}));

    } // end stamper() function
}
//call stamper fct

stamper();

// // load a url and file object
// const upload = document.querySelector('input[type=file]').files[0];
// watermark([upload, 'img/logo.png'])
//   .image(watermark.image.lowerLeft(0.5))
//   .then(img => document.getElementById('container').appendChild(img));

// // watermark from remote source
// const options = {
//   init(img) {
//     img.crossOrigin = 'anonymous'
//   }
// };
// watermark(['http://host.com/photo.jpg', 'http://host.com/logo.png'], options)
//   .image(watermark.image.lowerRight(0.5))
//   .then(img => document.getElementById('container').appendChild(img));