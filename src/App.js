import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import axios from "axios";

const App = () => {
    const [text, setText] = useState("");
    const [status, setStatus] = useState("...");
    const [fetch, setFetch] = useState(false);
    const url = "https://d2z21h1z91.execute-api.us-east-1.amazonaws.com/prod";

    useEffect(() => {
        axios({
            method: "GET",
            url: `${url}/get-text`,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(({ data }) => {
                console.log(data);
                setText(data.text);
                setStatus("Text loaded successfully.");
            })
            .catch((err) => {
                console.error(err);
                setStatus("Oops! There was some eror in loading the text.");
            });
    }, [setFetch, fetch]);

    const copyText = () => {
        const textEl = document.getElementById("text");
        textEl.select();
        document.execCommand("copy");
        setStatus("Text copied to clipboaard.");
    };

    const clearText = () => {
        setText("");
        setStatus("Text cleared successfully.");
    };

    const fetchText = () => {
        setStatus("...");
        setFetch(true);
        setTimeout(() => setStatus("Text fetched successfully."), 500);
    };

    const saveText = () => {
        setStatus("...");
        axios
            .post(
                `${url}/put-text`,
                JSON.stringify({
                    text,
                })
            )
            .then(({ data }) => {
                console.log(data);
                setStatus("Text saved successfully");
            })
            .catch((err) => {
                console.error(err);
                setStatus("Oops! There was some eror in saving the text.");
            });
    };

    return (
        <div>
            <div className="heading">
                <h1 onClick={clearText}>Droptext</h1>
            </div>
            <div className="txt-area">
                <textarea
                    id="text"
                    rows="10"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
            </div>
            <div className="btn-sec">
                <button className="save-btn" onClick={() => saveText()}>
                    Save
                </button>
                <button className="copy-btn" onClick={() => copyText()}>
                    Copy
                </button>
                <div className="msg-box" onClick={() => fetchText()}>
                    <p>{status}</p>
                </div>
            </div>
        </div>
    );
};

render(<App />, document.getElementById("root"));
