const Game = require("../models/GameSchema.js");

const gameController = {
    getAllGames: (async (req, res) => {
        const games = await Game.find();

        if (games.length > 0) {

            res.status(200).send({msg: "games found", games: games})
        } else {
            res.status(404).send({msg: "games not found"})
        }


    }),
    createGame: (async (req, res) => {
        const {title, price, publisher, developer, releaseDate, status, description, shortDescription} = req.body;

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
            res.status(500).send({msg: "error creating game"})
        }
    }),
    getGame: (async (req, res) => {
        const { id } = req.params;

        const game = await Game.findById(id);

        res.status(200).send({ msg: "Game retreived", game: game});
        
    }),
    editGame: (async (req, res) => {
        const { id } = req.params;
        const updateContent = req.body;

        try {
            const game = await Game.findByIdAndUpdate(id, updateContent);

            res.status(200).send({msg: "Game updated successfully"});
        } catch (error) {
            console.error(error);
        }
        
    }),
    deleteGame: (async (req, res ) => {
        const { id } = req.params;

        const game = await Game.findByIdAndDelete(id);

        res.status(200).send({msg: "Game deleted"});
        
    })
};

module.exports = gameController;