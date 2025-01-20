const Tag = require("../models/TagsSchema.js")

const tagController = {
    getAllTags: (async(req, res) => {

        const tags = await Tag.find();
        if (tags.length > 0) {
            res.status(200).send({ msg: "tags successfully retrieved" })
        } else {
            res.status(404).send({ msg: "no tags found" })
        }

    }),
    createTag: (async (req, res) => {
        const {name} = req.body;

        const tag = new Tag({name});
        const result = await tag.save()
        if (result._id) {
            res.status(201).send({ msg: "Tag successfully created" })
        } else {
            res.status(500).send({ msg: "Error creating tag" })
        }

    }),
    getTag: (async (req, res) => {
        const { id } = req.params;

        const tag = await Tag.findById(id);

        res.status(200).send({ msg: "Tag retrieved", tag: tag })
        
    }),
    updateTag: (async (req, res) => {
        const { id } = req.params;
        const updateContent = req.body;

        try {
            const tags = await Tag.findByIdAndUpdate(id, updateContent);
            res.status(200).send({ msg: "tag updated successfully" })
        } catch (error) {
            console.error(error)
        }
        
    }),
    deleteTag: (async (req, res) => {
        const { id } = req.params;
        const tag = await Tag.findByIdAndDelete(id);

        res.status(200).send({msg: "Tag deleted"});

    })
}

module.exports = tagController;