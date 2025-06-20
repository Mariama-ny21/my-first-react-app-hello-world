import React, { useState } from 'react';
import { scanFile, getFileReport } from '../api/fileScan';

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "navy",
  color: "white",
  border: "none",
  cursor: "pointer",
  marginTop: "30px",
  borderRadius: "5px",
  lineHeight: "1.5",
  verticalAlign: "middle",
};

const fileInputStyle = {
  display: "none"
};

const customFileButtonStyle = {
  ...buttonStyle,
  marginLeft: 0
};

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setResult('');
    setReport('');
    setError('');
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setResult('');
    setReport('');
    setError('');
    try {
      const scanResponse = await scanFile(file);
      setResult(scanResponse);

      // Wait a few seconds for the scan to process (VirusTotal queues scans)
      await new Promise(res => setTimeout(res, 5000));

      // Use the resource (scan_id or sha256) to get the report
      const resource = scanResponse.resource || scanResponse.sha256;
      if (resource) {
        const reportResponse = await getFileReport(resource);
        setReport(reportResponse);
      } else {
        setError('Could not retrieve scan resource for report.');
      }
    } catch (err) {
      let msg = "Error scanning file";
      if (err.response && err.response.data && err.response.data.error) {
        msg = err.response.data.error;
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Helper to render the result in a user-friendly way
  const renderResult = () => {
    if (!result) return null;
    let parsed;
    try {
      parsed = typeof result === "string" ? JSON.parse(result) : result;
    } catch {
      return (
        <pre style={resultStyle}>{result}</pre>
      );
    }
    return (
      <div style={resultStyle}>
        <div><strong>Status:</strong> {parsed.verbose_msg}</div>
        {parsed.sha256 && (
          <div>
            <a
              href={`https://www.virustotal.com/gui/file/${parsed.sha256}/detection`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4fc3f7" }}
            >
              View full scan report
            </a>
          </div>
        )}
        <div style={{ fontSize: "12px", marginTop: "10px" }}>
          <strong>SHA256:</strong> {parsed.sha256}
        </div>
      </div>
    );
  };

  // Helper to render the full report
  const renderReport = () => {
    if (!report) return null;
    let parsed;
    try {
      parsed = typeof report === "string" ? JSON.parse(report) : report;
    } catch {
      return (
        <pre style={resultStyle}>{report}</pre>
      );
    }
    return (
      <div style={resultStyle}>
        <div><strong>Scan Report:</strong></div>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(parsed, null, 2)}</pre>
      </div>
    );
  };

  const resultStyle = {
    textAlign: "left",
    background: "#222",
    color: "#f4f4f4",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "10px"
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "30px", marginLeft: "50px" }}>
        <label style={customFileButtonStyle}>
          Choose File
          <input
            type="file"
            onChange={handleFileChange}
            style={fileInputStyle}
          />
        </label>
        {file && (
          <span style={{ marginLeft: "15px", color: "#333", fontWeight: "bold" }}>
            {file.name}
          </span>
        )}
        <button
          onClick={handleSubmit}
          style={buttonStyle}
          disabled={loading}
        >
          {loading ? "Scanning..." : "Scan File"}
        </button>
      </div>
      {error && (
        <div style={{
          color: "#fff",
          background: "#c0392b",
          padding: "10px",
          borderRadius: "5px",
          marginTop: "10px"
        }}>
          {error}
        </div>
      )}
      {renderResult()}
      {renderReport()}
    </div>
  );
};

export default FileUpload;