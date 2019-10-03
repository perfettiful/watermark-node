/** To Run type `node --max-old-space-size=2048 jimp-watermark.js <starting index> <ending index>` */

const fs = require('fs');
var Jimp = require('jimp');

async function stamper(i) {
    //let imgRaw = `images/inputPics/IMG_000${i}.JPG`;
    //C:/Users/Nathan\ Perfetti/Desktop/SellerCloud Imgs/7-8/originals\ 2/IMG_000${i}.JPG
    let imgRaw;
    if (i < 10) {
        //imgRaw = `images/inputPics/IMG_000${i}.JPG`;
        imgRaw =`C:/Users/Nathan\ Perfetti/Desktop/SellerCloud\ Imgs/9-23/originals/IMG_000${i}.JPG`
    } else if (i < 100) {
        //imgRaw = `images/inputPics/IMG_00${i}.JPG`;
        imgRaw =`C:/Users/Nathan\ Perfetti/Desktop/SellerCloud\ Imgs/9-23/originals/IMG_00${i}.JPG`
    } else if (i < 1000) {
        //imgRaw = `images/inputPics/IMG_0${i}.JPG`;
        imgRaw =`C:/Users/Nathan\ Perfetti/Desktop/SellerCloud\ Imgs/9-23/originals/IMG_0${i}.JPG`
    } else if (i < 10000) {
        //imgRaw = `images/inputPics/IMG_${i}.JPG`;
        imgRaw =`C:/Users/Nathan\ Perfetti/Desktop/SellerCloud\ Imgs/9-16/originals/IMG_${i}.JPG`
    } //end ifs



    let imgLogo = 'images/watermark/Tech_Discounts_Logo.png'; //a 155px x 72px logo

    let imgActive = imgRaw;
    //let imgExported = `images/outputPics/watermarked_${i}.jpg`;
    let imgExported = `C:/Users/Nathan\ Perfetti/Desktop/SellerCloud Imgs/9-23/watermarked/watermarked_${i}.jpg`;


    let textData = {
        text: "A DIVISION OF THE JOBS FOUNDATION", //the text to be rendered on the image
        maxWidth: 1004, //image width - 10px margin left - 10px margin right
        maxHeight: 72 + 20, //logo height + margin
        placementX: 320, // 10px in on the x axis
        placementY: 3740 //bottom of the image: height - maxHeight - margin 
    };
    
    Jimp.read(imgRaw)
        .then(tpl => (tpl.clone().write(imgActive)))

        //read cloned (active) image
        .then(() => (Jimp.read(imgActive)))

        //combine logo into image
        .then(tpl => (
                Jimp.read(imgLogo).then(logoTpl => {
                    logoTpl.opacity(0.6);
                    return tpl.composite(logoTpl, 10, 3475, [Jimp.BLEND_DESTINATION_OVER, 0.2, 0.2]);
                })
            )

            // //load font  
            .then(tpl => (
                Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => ([tpl, font]))
            ))

            // //add footer text
            .then(data => {

                tpl = data[0];
                font = data[1];

                return tpl.print(font, textData.placementX, textData.placementY, {
                    text: textData.text,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                }, textData.maxWidth, textData.maxHeight);
            })

            //export image
            .then(tpl => (tpl.quality(100).write(imgExported)))

            //log exported filename
            .then(tpl => {
                console.log('New image ' + i + ' : ' + imgExported);
            })

            //catch errors
            .catch(err => {
                console.error(err);
            }));
    //return;
} //end stamper function

async function resizer(i) {

    let dateFolder = '8-26';
    //let imgRaw = `images/inputPics/IMG_000${i}.JPG`;
    //C:/Users/Nathan\ Perfetti/Desktop/SellerCloud Imgs/7-8/originals\ 2/IMG_000${i}.JPG
    let imgRaw;
    if (i < 10) {
        //imgRaw = `images/inputPics/IMG_000${i}.JPG`;
        imgRaw =`C:/Users/Nathan\ Perfetti/Desktop/SellerCloud\ Imgs/${dateFolder}/originals/IMG_000${i}.JPG`
    } else if (i < 100) {
        //imgRaw = `images/inputPics/IMG_00${i}.JPG`;
        imgRaw =`C:/Users/Nathan\ Perfetti/Desktop/SellerCloud\ Imgs/${dateFolder}/originals/IMG_00${i}.JPG`
    } else if (i < 1000) {
        //imgRaw = `images/inputPics/IMG_0${i}.JPG`;
        imgRaw =`C:/Users/Nathan\ Perfetti/Desktop/SellerCloud\ Imgs/${dateFolder}/originals/IMG_0${i}.JPG`
    } else if (i < 10000) {
        //imgRaw = `images/inputPics/IMG_${i}.JPG`;
        imgRaw =`C:/Users/Nathan\ Perfetti/Desktop/SellerCloud\ Imgs/${dateFolder}/originals/IMG_${i}.JPG`
    } //end ifs

    let imgLogo = 'images/watermark/Tech_Discounts_Logo.png'; //a 155px x 72px logo

    let imgActive = imgRaw;

    let imgResized = `C:/Users/Nathan\ Perfetti/Desktop/SellerCloud\ Imgs/${dateFolder}/originals/IMG_${i}.JPG`
    //let imgExported = `images/outputPics/watermarked_${i}.jpg`;
    let imgExported = `C:/Users/Nathan\ Perfetti/Desktop/SellerCloud Imgs/${dateFolder}/watermarked/resized90_${i}.jpg`;

    let textData = {
        text: "A DIVISION OF THE JOBS FOUNDATION", //the text to be rendered on the image
        maxWidth: 1004, //image width - 10px margin left - 10px margin right
        maxHeight: 72 + 20, //logo height + margin
        placementX: 320, // 10px in on the x axis
        placementY: 3740 //bottom of the image: height - maxHeight - margin 
    };

    Jimp.read(imgRaw, function (err, image) {
        if (err) throw err;
        image.resize(1024, 768)
             .quality(85)                 
             .write(imgExported);
    
        // save to imgExported file path
    });//end Jimp read
}//end resizer


async function run(start, endBefore) {
    //let start = process.argv[2];
    //let endBefore = process.argv[3];

    const inputFolder = "./images/inputPics";
    var inputFolderLen;

    fs.readdir(inputFolder, (err, files) => {
        inputFolderLen = files.length;
        console.log("Number of Imgs in Folder: ", inputFolderLen);
    });


    for (var i = start; i < endBefore; i++) {
        await stamper(i);
        //await resizer(i);

    } // end for loop

} //end run() def

run(process.argv[2], process.argv[3]);
//stamper(99);
//resizer(3)
