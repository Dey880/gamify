const Game = require("../models/GameSchema.js");

const gameController = {
    getAllGames: (async (req, res) => {
        try {
            const games = await Game.find();
            if (games.length > 0) {
                res.status(200).send({msg: "games found", games: games});
            } else {
                res.status(404).send({msg: "games not found"});
            };
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error"});
        };
    }),
    createGame: (async (req, res) => {
        console.log(req.body)
        const {title, price, publisher, developer, releaseDate, status, description, shortDescription} = req.body;
        try {
            const game = new Game({
                title,
                price,
                publisher,
                developer,
                releaseDate,
                status,
                description,
                shortDescription,
            });
            let result = await game.save();
            if (result._id) {
                res.status(201).send({msg: "successfully created game"});
            } else {
                res.status(500).send({msg: "error creating game"});
            };
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error"});
        };
    }),
    getGame: (async (req, res) => {
        const { id } = req.params;
        try {
            const game = await Game.findById(id);
            res.status(200).send({ msg: "Game retreived", game: game});
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error"});
        };
    }),
    editGame: (async (req, res) => {
        console.log(req.body)
        const { id } = req.params;
        const updateContent = req.body;
        try {
            const game = await Game.findByIdAndUpdate(id, updateContent);
            res.status(200).send({ msg: "Game updated successfully", game: game });
        } catch (error) {
            console.error(error);
        };
    }),
    deleteGame: (async (req, res ) => {
        const { id } = req.params;
        try {
            const game = await Game.findByIdAndDelete(id);
            res.status(200).send({ msg: "Game deleted", game: game });
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error"});
        };
    })
};

module.exports = gameController;