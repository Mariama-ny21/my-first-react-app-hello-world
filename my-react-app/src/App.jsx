import { useState } from "react";
import FileUpload from "./components/FileUpload.jsx";
import DomainSearch from "./components/DomainSearch";

// Styles for the main app container and elements
//These styles are in index.css and App.css, but if removed here, they will not be applied as the App goes blank
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  input: {
    margin: "10px",
    padding: "8px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "navy",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  label: {
    fontWeight: "bold",
    marginTop: "10px",
    color: "#222",
  },
};

function App() {
  // State for the user's name input
  const [name, setName] = useState("");
  // State for the user's text input
  const [text, setText] = useState("");
  // State for the result to display after submit
  const [result, setResult] = useState("");

  // Validation function for both name and text inputs
  const isValid = (val, type) =>
    (type === "name"
      ? /^[A-Za-z\s]+$/
      : /^[A-Za-z0-9\s.,!?]+$/).test(val) &&
    val.length > 0 &&
    val.length <= 50;

  // Handles the submit button click
  const handleSubmit = () => {
    if (!isValid(name, "name") || !isValid(text, "text")) return;
    setResult(`${name} - ${text}`); // Concatenate name and text for display
  };

  return (
    <div style={styles.container}>
      <h1>Hello World!</h1>
      {/* Section 1: Name and Text Input */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <label style={{ margin: 0 }}>
          Enter your name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            style={styles.input}
            placeholder="Your Name"
          />
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <label style={{ margin: 0 }}>
          Enter something:
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            style={styles.input}
            placeholder="Something"
          />
        </label>
        <button onClick={handleSubmit} style={styles.button}>
          Submit
        </button>
      </div>
      {result && <p style={styles.label}>{result}</p>}
      <hr style={{ margin: "30px 0" }} /> {/* Divider after first section */}

      {/* Section 2: File Upload */}
      <FileUpload />
      <hr style={{ margin: "30px 0" }} /> {/* Divider after second section */}

      {/* Section 3: Domain Search */}
      <DomainSearch />
    </div>
  );
}

export default App;
// This is the main App component for the React application.