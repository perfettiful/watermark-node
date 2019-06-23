const fs = require('fs');
var Jimp = require('jimp');
//var start = process.argv[2];
//var endBefore = process.argv[3];
//if you are following along, create the following 2 images relative to this script:

async function stamper(i) {
    //let imgRaw = `images/inputPics/IMG_000${i}.JPG`;
    let imgRaw;
    if (i < 10) {
        imgRaw = `images/inputPics/IMG_000${i}.JPG`;
    } else if (i < 100) {
        imgRaw = `images/inputPics/IMG_00${i}.JPG`;
    } else if (i < 1000) {
        imgRaw = `images/inputPics/IMG_0${i}.JPG`;
    } else if (i < 10000) {
        imgRaw = `images/inputPics/IMG_${i}.JPG`;
    } //end ifs



    let imgLogo = 'images/inputPics/Tech_Discounts_Logo.png'; //a 155px x 72px logo

    let imgActive = imgRaw;
    let imgExported = `images/outputPics/watermarked_${i}.jpg`;

    let textData = {
        text: "A DIVISION OF THE JOBS FOUNDATION", //the text to be rendered on the image
        maxWidth: 1004, //image width - 10px margin left - 10px margin right
        maxHeight: 72 + 20, //logo height + margin
        placementX: 260, // 10px in on the x axis
        placementY: 3735 //bottom of the image: height - maxHeight - margin 
    };

    //read template & clone raw image 
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
    return;
} //end stamper function


async function run() {

    const inputFolder = "./images/inputPics";
    var inputFolderLen;

    fs.readdir(inputFolder, (err, files) => {
        inputFolderLen = files.length;
        console.log("Number of Imgs in Folder: ", inputFolderLen);
    });

    let inputArr = [];

    for (var i = 2; i < 9; i++) {
        await stamper(i);

    } // end for loop

} //end run() def

run();
//stamper(2);