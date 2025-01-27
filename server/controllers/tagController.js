const Tag = require("../models/TagsSchema.js")

const tagController = {
    getAllTags: (async(req, res) => {

        const tags = await Tag.find();
        if (tags.length > 0) {
            res.status(200).send({ msg: "Tags successfully retrieved", tags: tags });
        } else {
            res.status(404).send({ msg: "No tags found" });
        };

    }),
    createTag: (async (req, res) => {
        const {name} = req.body;

        const tag = new Tag({name});
        const result = await tag.save();
        if (result._id) {
            res.status(201).send({ msg: "Tag successfully created", tag: tag });
        } else {
            res.status(500).send({ msg: "Error creating tag" });
        };

    }),
    getTag: (async (req, res) => {
        const { id } = req.params;

        const tag = await Tag.findById(id);
        if (tag) {
            res.status(200).send({ msg: "Tag retrieved", tag: tag });
        } else {
            res.status(404).send({ msg: "Tag not found" });
        };
        
    }),
    updateTag: (async (req, res) => {
        const { id } = req.params;
        const updateContent = req.body;

        const tag = await Tag.findByIdAndUpdate(id, updateContent);
        if (tag) {
            res.status(202).send({ msg: "tag updated successfully", tag: tag });
        } else {
            res.status(500).send({ msg: "Something happened" });
        };
        
    }),
    deleteTag: (async (req, res) => {
        const { id } = req.params;
        const tag = await Tag.findByIdAndDelete(id);
        if (tag) {
            res.status(200).send({ msg: "Tag deleted successfully", tag: tag });
        } else {
            res.status(500).send({ msg: "Something happened" });
        };
    })
};

module.exports = tagController;