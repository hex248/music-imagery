import "./App.css";
import React, { useRef, useEffect, useState } from "react";

import analysis from "./data/analysis.json";
import encode from "./encode.js";

const App = () => {
    const capitalise = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    return (
        <>
            <div className="App-header">
                <div>
                    <h1 className="noselect">Music Imagery</h1>
                    <div className="flexBreak" />
                    <h1 className="noselect" id="name">
                        Oliver Bryan
                    </h1>
                </div>
            </div>
            <div className="App">
                <div className="artistList">
                    {analysis.map((e) => {
                        return (
                            <a className="analysisLink" href={`/artists/${encode(e.artists[0])}/${e.type}s/${encode(e.name)}`}>
                                <div className="listElement">
                                    <img src={`/data/photos/previews/${e.photo}`} />
                                    <div className="flexBreak" />
                                    <div id="itemInfo">
                                        <h1 id="name">{e.name}</h1>
                                        <h1 id="artists">{e.artists.join(", ")}</h1>
                                        <h1 id="type">({capitalise(e.type)})</h1>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default App;
