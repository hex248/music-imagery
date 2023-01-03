import "./App.css";
import "./Display.css";
import React, { useEffect, useState } from "react";
import encode from "./encode.js";
import analysis from "./data/analysis.json";

const Display = () => {
    const [analysisPiece, setAP] = useState({});
    const [text, setText] = useState("");

    const getPage = (location) => {
        let page = "";
        let href = location.href.replace(location.origin, "").slice(1);
        let hrefSplit = href.split("/");
        if (hrefSplit[0] === "artists") {
            let artistAnalyses = analysis.filter((a) => encode(a.artists[0]) === hrefSplit[1]);

            artistAnalyses = artistAnalyses.filter((a) => a.type === hrefSplit[2].slice(0, hrefSplit[2].length - 1));

            page = artistAnalyses.find((a) => encode(a.name) === hrefSplit[3]);
        }

        setAP(page);

        async function getText() {
            const tempText = await fetch(`/data/textFiles/${page.textFile}`).then((res) => res.text());
            setText(tempText);
        }
        getText();
    };

    useEffect(() => {
        getPage(window.location);
    }, []);

    return analysisPiece.name ? (
        <>
            <div class="main">
                <a id="homeButton" href="/">
                    home
                </a>
                <div className="mainDisplay">
                    <div className="displayInfo">
                        <img src={`/data/photos/large/${analysisPiece.photo}`} id="analysisPhoto" alt={analysisPiece.photo} />
                        <div className="text">
                            {analysisPiece.type === "song" ? <h1 id="songName">Name: {analysisPiece.name}</h1> : <h1 id="albumName">Name: {analysisPiece.album}</h1>}
                            <h1 id="artistNames">{analysisPiece.artists.length > 1 ? `Artists: ${analysisPiece.artists.join(", ")}` : `Artist: ${analysisPiece.artists[0]}`}</h1>
                            {analysisPiece.type === "song" ? <h1 id="albumName">Album: {analysisPiece.album}</h1> : null}
                        </div>
                    </div>
                    <p id="mainAnalysis" style={{ "white-space": "pre-line" }}>
                        {text}
                    </p>
                </div>
            </div>
        </>
    ) : (
        "a"
    );
};

export default Display;
