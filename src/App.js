import React, { useState, useEffect } from "react";

export default function App() {
  const [inputField, setInput] = useState("");
  const [outputField, setOutput] = useState("");
  const [fetchData, setFetch] = useState(false);

  useEffect(() => {
    setOutput("Loading...");
    fetch(`https://english-to-ipa-server.herokuapp.com/${inputField}`)
      .then((response) =>
        response.json().then((data) => {
          if (data.success !== undefined) {
            setOutput(data.success);
          } else {
            setOutput(data.error);
          }
        })
      )
      .catch((e) => {
        setOutput("");
      });
  }, [fetchData]);

  return (
    <div className="container">
      <h1>English to IPA Converter</h1>
      <input
        type="text"
        value={inputField}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            setFetch(!fetchData);
          }
        }}
      />
      <button onClick={() => setFetch(!fetchData)}>Convert</button>
      {outputField && inputField !== "" ? <p>{outputField}</p> : null}
    </div>
  );
}
