import { useState } from "react";
import axios from "axios";

export default function GameForm() {
    const [msg, setMsg ] = useState("");
    const [ GameForm, setGameForm ] = useState({
        title: "",
        shortDescription: "",
        description: "",
        publisher: "",
        developer: "",
        releaseDate: Date.now(),
        price: 0,
        discount: 0,
        status: "",
        tags: "",
        img: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/games/`, GameForm, {
            withCredentials: true,
        })
        .then((response) => {
            setMsg(response.data.msg);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        });
    }

    function handleChange(e) {
        const { id, value } = e.target;

        setGameForm((prevState) => ({
        ...prevState,
        [id]: value,
        }));
    }

    return (
        <div className="gameForm">
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Title"
                id="title"
                onChange={handleChange}
                />
                <input
                type="text"
                placeholder="Short description"
                id="shortDescription"
                onChange={handleChange}
                />
                <textarea
                name=""
                placeholder="Description"
                id="description"
                onChange={handleChange}
                ></textarea>
                <input
                type="text"
                placeholder="Publisher"
                id="publisher"
                onChange={handleChange}
                />
                <input
                type="text"
                placeholder="Developer"
                id="developer"
                onChange={handleChange}
                />
                <input
                type="number"
                placeholder="Price"
                id="price"
                onChange={handleChange}
                />
                <input
                type="number"
                placeholder="Discount"
                id="discount"
                onChange={handleChange}
                />
                <select id="status" onChange={handleChange}>
                    <option id="notReleased">Not Released</option>
                    <option id="preOrder">Pre order</option>
                    <option id="released">Released</option>
                </select>
                <div>
                    <h3>Release Date</h3>
                    <input
                        type="Date"
                        min={Date.now()}
                        id="releaseDate"
                        onChange={handleChange}
                    />
                </div>
                <input
                type="text"
                placeholder="Tags"
                id="tags"
                onChange={handleChange}
                />
                <input type="file" id="img" onChange={handleChange} />
                <button type="submit">Create game</button>
                {msg?
                <div><p>{msg}</p></div>
            :
            <div></div>
            }
            </form>
        </div>
    );
}
