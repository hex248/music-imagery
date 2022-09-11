import "./App.css";
import "./Display.css";
import React, { useRef, useEffect, useState } from "react";
import encode from "./encode.js";
import analysis from "./data/analysis.json";

// const cache = {};

// function importAll(r) {
//     r.keys().forEach((key) => (cache[key] = r(key)));
// }

// importAll(require.context("./data/textFiles", true, /\.txt$/));

const Display = () => {
    const [analysisPiece, setAP] = useState({});
    const [text, setText] = useState("");

    const getPage = (location) => {
        let page = "";
        let href = location.href.replace(location.origin, "").slice(1);
        let hrefSplit = href.split("/");
        if (hrefSplit[0] == "artists") {
            let artistAnalyses = analysis.filter((a) => encode(a.artists[0]) == hrefSplit[1]);

            artistAnalyses = artistAnalyses.filter((a) => a.type == hrefSplit[2].slice(0, hrefSplit[2].length - 1));

            page = artistAnalyses.find((a) => encode(a.name) == hrefSplit[3]);
        }

        setAP(page);

        async function getText() {
            const text = await fetch(`/data/textFiles/${page.textFile}`).then((res) => res.text());
            setText(text);
        }
        getText();
    };

    useEffect(() => {
        getPage(window.location);
    }, []);

    return analysisPiece.name ? (
        <>
            <div className="header">
                <div className="header-info">
                    <img src={`/data/photos/large/${analysisPiece.photo}`} id="analysisPhoto" />
                    <h1>Name: {analysisPiece.name}</h1>
                    <h1>{analysisPiece.artists.length > 1 ? `Artists: ${analysisPiece.artists.join(", ")}` : `Artist: ${analysisPiece.artists[0]}`}</h1>
                </div>
            </div>
            <p>{text}</p>
        </>
    ) : (
        "a"
    );
};

export default Display;
