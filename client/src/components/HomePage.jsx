import { useState, useEffect } from 'react';
import axios from 'axios';
import QrScanner from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [result, setResult] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Start scanning when the component mounts
    startScanning();
    const token = localStorage.getItem('token');
    if (token == null) {
      navigate('/');
    }
    // Optionally, you can return a cleanup function to stop scanning when the component unmounts
    return () => {
      // Stop scanning or perform cleanup if needed
      // In this case, we'll clear the result and stop scanning
      setResult(null);
      setScanned(false);
    };
  }, [navigate]); // Empty dependency array means this effect runs once on mount

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      setScanned(true);
      processScanResult(data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/');
  };

  const handleError = (err) => {
    console.error(err);
  };

  const startScanning = () => {
    setResult(null);
    setScanned(false);
  };

  const processScanResult = (data) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    
    axios.post('http://localhost:3001/admin/scan', data, config)
      .then((response) => {
        if (response.data.msg === "success") {
          setMessage("Valid");
        } else if (response.data.msg === "fail") {
          setMessage("Invalid");
        } else if (response.data.msg === "invalid") {
          setMessage("Invalid user data");
        } else {
          setMessage("Unknown response from the backend");
        }
      })
      .catch((error) => {
        setMessage(error.message || 'An error occurred. Please try again.');
      });
  };

  const resetAllFlags = () => {
    axios.post('http://localhost:3001/admin/reset')
      .then((response) => {
        setMessage(response.data.msg);
      })
      .catch((error) => {
        setMessage(error.message || 'An error occurred. Please try again.');
      });
  };

  return (
    <div className="flex justify-center items-center h-screen text-white">
      <div>
        <button onClick={handleLogout} className="rounded px-3 py-1 bg-red-600">Logout</button>
        {!scanned && (
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '250px', height: '250px' }}
          />
        )}
        
        {result && typeof result === 'object' && (
          <div>
            <p>Scan Result: {result.text}</p>
            {message && <p className="">{message}</p>}
          </div>
        )}
        <button
          onClick={startScanning}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Scan
        </button>
        <button
          onClick={resetAllFlags}
          className="m-4 px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Reset All Flags
        </button>
      </div>
    </div>
  );
};

export default HomePage;

