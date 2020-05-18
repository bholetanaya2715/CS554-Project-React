const express = require("express");
const router = express.Router();
const data = require("../data");
const pdf = data.pdf;
var path = require('path');
const checkAuth = require("./checkAuth")
const fs = require("fs")
const del = require('del');

/**
 * Get user's diet history
 */
router.post('/pdf/:id', async (req, res) => {
    const id = req.params.id;
    let resPath = path.join(__dirname, "../GeneratedPDF/" + id + '_history.pdf')

    try {
        const deletedPaths = await del([resPath]);

        // console.log('Deleted files and directories:\n', deletedPaths.join('\n'));

        await pdf.pdfDoc(id);
        if (fs.existsSync(resPath)) {
            res.sendFile(resPath)
        } else {
            throw "File does not exist."
        }
        // res.json('Success');
    } catch (e) {
        console.log('e', e)
    }

})


router.get('/pdf/:id', async (req, res) => {
    var id = req.params.id;
    let resPath = path.join(__dirname, "../GeneratedPDF/" + id + '_history.pdf')
    try {
        if (fs.existsSync(resPath)) {
            res.sendFile(resPath)
        } else {
            throw "File does not exist."
        }
    } catch (e) {
        console.error(e)
    }
})

module.exports = router