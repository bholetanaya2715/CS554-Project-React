const PDFDocument = require('pdfkit');
const fs = require('fs');
const userData = require('./users')
var path = require('path')

/**
 * Take email and param 
 * @returns User history deatils (Food and calorie intake)
 * @param {*} id 
 */
async function foodHistory(id) {
    var result = ""
    let user = await userData.getUserByUserId(id)
    let chartdata = [];
    if (!user) throw "No user exist with the given email id"
    if (!Array.isArray(user.food)) return "No Diet History available for user"

    user.food.map((i) => {

        // result +="Food Name"
        result += "Food Name : " + i[0].food_name + "\n" +
            "Calories Count : " + i[0].nf_calories + "\n" +
            "Consumed at : " + i[0].consumed_at + " \n \n"

    })

    return result
}

async function chartHistory(id) {
    let user = await userData.getUserByUserId(id)
    let chartdata = [];
    let chartObj = {}
    if (!user) throw "No user exist with the given email id"
    if (!Array.isArray(user.food)) return "No Diet History available for user"

    user.food.map((i) => {

        chartObj.calories = i[0].nf_calories
        chartObj.consumedAt = i[0].consumed_at

        chartdata.push(chartObj)

    })

    return chartdata
}


async function waterHistory(id) {
    var waterResult = ""
    let user = await userData.getUserByUserId(id)

    if (!user) throw "No user exist with the given email id"
    if (!Array.isArray(user.food)) return "No Diet History available for user"

    user.waterArchive.map((i) => {
        let targetAchieved = false
        if (i[0].waterCurrent >= i[0].waterCap) {
            targetAchieved = true
        }
        // result +="Food Name"
        waterResult += "Date : " + i[0].timestamp + "\n" +
            "Water had : " + i[0].waterCurrent + "\n" +
            "Water Goal : " + i[0].waterCap + " \n" +
            "Target Achieved :" + targetAchieved + "\n"

    })

    return waterResult

}

async function waterCurrent(id) {
    var userObj = await userData.getUserByUserId(id)
    if (!userObj) return "No user exist with the given email id"
    var userWaterObj = {}

    userWaterObj.waterGoal = userObj.water.waterGoal
    userWaterObj.waterCurr = userObj.water.waterCurrent
    userWaterObj.date = userObj.water.timestamp
    userWaterObj.name = userObj.displayName

    return userWaterObj
}

const lorem = 'Wellbeing is a digital health and wellness platform that provides physical fitness services such as calorie tracking';

async function pdfDoc(email) {
    let water = await waterCurrent(email)
    let res = await foodHistory(email)

    let waterArc = await waterHistory(email)

    const doc = new PDFDocument();

    let reqPath = path.join(__dirname, '../GeneratedPDF/');

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream(reqPath + email + '_history.pdf'));

    doc
        .text('WELLBEING', { align: 'center' })
        .font('Times-Roman')
        .fontSize(25);

    doc
        .moveDown(5)
        .font('Times-Roman')
        .fontSize(10)
        .text(lorem, 100, 100);

    doc
        .addPage()
        .font('Times-Bold')
        .fontSize(16)
        .text(`${JSON.stringify(water.name)} - Today's Water History`, { align: 'center' });

    if (water) {
        doc
            .font('Times-Roman')
            .fontSize(12)
            .moveDown(3)
            .text(`Date ${JSON.stringify(water.date)}`)
            .text(`Water goal : ${JSON.stringify(water.waterGoal)}`)
            // .text(`Date ${JSON.stringify(water.waterGoal)}`, { align: 'left' })
            .text(`Current water intake :  ${JSON.stringify(water.waterCurr)}`);
    }

    if (waterArc) {
        doc
            .addPage()
            .font('Times-Bold')
            .fontSize(16)
            .text(`${JSON.stringify(water.name)} - Past Water History`, { align: 'center' });


        doc
            .moveDown(3)
            .fontSize(12)
            .font('Times-Roman')
            .text(waterArc, 100, 100);
    }

    if (res) {
        doc
            .addPage()
            .font('Times-Bold')
            .fontSize(16)
            .text(`${JSON.stringify(water.name)} - Food History`, { align: 'center' });


        doc
            .fontSize(12)
            .font('Times-Roman')
            .text(res, 100, 100);
    }

    // Add some text with annotations
    doc
        .addPage()
        .fillColor('blue')
        .text('About well being', 100, 100, {
            link: ('http://localhost:3000/about'),
            underline: true,
            align: 'center'
        })
        // .font(fontPath)
        .moveDown(3)
        .text('Have a Good Day!', { align: 'center' })

    doc.end();
    return true;
}

module.exports = {
    pdfDoc,
    chartHistory
}