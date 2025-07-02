import React, { useState } from 'react';
import { getDomainReport } from '../api/fileScan';

// Reuse the button style from App.jsx for consistency
const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "navy",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
};

const DomainSearch = () => {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission (which would reload the page)
    setLoading(true); // Sets loading state to true (shows "Checking..." on the button)
    setResult(null); // Clears any previous result
    setError(''); // Clears any previous error message
    try {
      const data = await getDomainReport(domain);
      setResult(data);
    } catch (err) {
      setError('Error fetching domain report.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to render user-friendly WHOIS info
  const renderWhois = (whois) => {
    if (!whois) return null;
    return (
      <div style={{ marginTop: 10 }}>
        <strong>WHOIS Info:</strong>
        <ul style={{ background: "#222", color: "#f4f4f4", padding: 10, borderRadius: 5, listStyle: "none" }}>
          {whois.split('\n').map((line, idx) => (
            <li key={idx} style={{ marginBottom: 2 }}>{line}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div style={{ marginTop: 30 }}>
      <form onSubmit={handleSubmit}>
        {/* Input for entering the domain to check */}
        <input
          type="text"
          value={domain}
          onChange={e => setDomain(e.target.value)}
          placeholder="Enter domain (example.com)"
          style={{ padding: 8, fontSize: 16, marginRight: 10 }}
        />
        {/* Button to submit the domain for checking */}
        <button type="submit" style={buttonStyle}>
          {loading ? 'Checking...' : 'Check Domain'}
        </button>
      </form>
      {/* Display error message if there is one */}
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      {/* Display the result if available */}
      {result && (
        <div style={{ marginTop: 10 }}>
          {/* Show response code and message */}
          <div>
            <strong>Response:</strong> {result.response_code} - {result.verbose_msg}
          </div>
          {/* Show user-friendly WHOIS info if available */}
          {renderWhois(result.whois)}
        </div>
      )}
    </div>
  );
};

export default DomainSearch;