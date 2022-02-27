import React, { useState, useEffect } from "react";

export default function App() {
  const [inputField, setInput] = useState("");
  const [outputField, setOutput] = useState("");
  const [fetchData, setFetch] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:80/${inputField}`)
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
    <div>
      <h1>English to IPA Converter</h1>
      <input
        type="text"
        value={inputField}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => setFetch(!fetchData)}>Convert</button>
      {outputField && inputField !== "" ? <p>{outputField}</p> : null}
    </div>
  );
}
