const Tag = require("../models/TagsSchema.js")

const tagController = {
    getAllTags: (async(req, res) => {
        try {
            const tags = await Tag.find();
            if (tags.length > 0) {
                res.status(200).send({ msg: "Tags successfully retrieved", tags: tags });
            } else {
                res.status(404).send({ msg: "No tags found" });
            };
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error"});
        };
    }),
    createTag: (async (req, res) => {
        console.log(req.body)
        const {name} = req.body;
        try {
            const tag = new Tag({name});
            const result = await tag.save();
            if (result._id) {
                res.status(201).send({ msg: "Tag successfully created", tag: tag });
            } else {
                res.status(500).send({ msg: "Error creating tag" });
            };
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error"});
        };
    }),
    getTag: (async (req, res) => {
        const { id } = req.params;
        try {
            const tag = await Tag.findById(id);
            if (tag) {
                res.status(200).send({ msg: "Tag retrieved", tag: tag });
            } else {
                res.status(404).send({ msg: "Tag not found" });
            };
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error"});
        };
    }),
    updateTag: (async (req, res) => {
        console.log(req.body)
        const { id } = req.params;
        const updateContent = req.body;
        try {
            const tag = await Tag.findByIdAndUpdate(id, updateContent);
            if (tag) {
                res.status(202).send({ msg: "tag updated successfully", tag: tag });
            } else {
                res.status(500).send({ msg: "Something happened" });
            };
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error"});
        };
    }),
    deleteTag: (async (req, res) => {
        const { id } = req.params;
        try {
            const tag = await Tag.findByIdAndDelete(id);
            if (tag) {
                res.status(200).send({ msg: "Tag deleted successfully", tag: tag });
            } else {
                res.status(500).send({ msg: "Something happened" });
            };
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error"});
        };
    })
};

module.exports = tagController;