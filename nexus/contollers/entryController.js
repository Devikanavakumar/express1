const Entry = require('../models/Entry'); // Matches your model name

// Display Notes with Pagination
exports.showNotes = async (req, res) => {
    try {
        let perPage = 6;
        let page = req.query.page || 1;

        const notes = await Entry.find()
            .sort({ createdAt: -1 })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec();

        const count = await Entry.countDocuments();

        res.render('mainpage', {
            notes: notes,
            current: page,
            totalPages: Math.ceil(count / perPage),
            title: 'Nexus | My Notes'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

// Save New Note
exports.saveNote = async (req, res) => {
    try {
        const newEntry = new Entry({
            title: req.body.title,
            description: req.body.description
        });

        await newEntry.save();
        res.redirect('/mainpage'); // Refresh dashboard to show new note
    } catch (error) {
        console.log(error);
        res.status(500).send("Error saving note");
    }
};