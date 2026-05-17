import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import CrowdMap from "./components/CrowdMap";
import CrowdChart from "./components/CrowdChart";

function App() {

  const [data, setData] = useState({});
  const [places, setPlaces] = useState([]);

  useEffect(() => {

    const fetchData = () => {

      // Dashboard API
      axios.get("http://127.0.0.1:5000/dashboard")
        .then((res) => {
          setData(res.data);
        });

      // Locations API
      axios.get("http://127.0.0.1:5000/locations")
        .then((res) => {
          setPlaces(res.data);
        });

    };

    // First Fetch
    fetchData();

    // Auto Refresh Every 5 Seconds
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);

  }, []);

  // Dynamic Risk Color
  const riskColor = () => {

    if (data.risk_level === "High") {
      return "#ff4d4d";
    }

    if (data.risk_level === "Medium") {
      return "#f5c542";
    }

    return "#4CAF50";
  };

  return (

    <div style={{
      background: "linear-gradient(to right, #071739, #0b2a52)",
      minHeight: "100vh",
      color: "white",
      padding: "40px",
      fontFamily: "Arial"
    }}>

      {/* TITLE */}

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "55px",
          textAlign: "center",
          marginBottom: "40px"
        }}
      >
        🛡️ Nagar Raksha AI
      </motion.h1>

      {/* DASHBOARD CARDS */}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: "20px"
      }}>

        {/* PEOPLE COUNT */}

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          style={cardStyle}
        >

          <h2>People Count</h2>
          <h1>{data.people_count || 0}</h1>

        </motion.div>

        {/* RISK LEVEL */}

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          style={{
            ...cardStyle,
            background: riskColor()
          }}
        >

          <h2>Risk Level</h2>
          <h1>{data.risk_level || "Loading..."}</h1>

        </motion.div>

        {/* ALERTS */}

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          style={cardStyle}
        >

          <h2>Alerts Sent</h2>
          <h1>{data.alerts_sent || 0}</h1>

        </motion.div>

        {/* AI PREDICTION */}

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          style={cardStyle}
        >

          <h2>AI Prediction</h2>
          <h1>{data.prediction || 0}</h1>

        </motion.div>

      </div>

      {/* LAST UPDATED */}

      <div style={{
        marginTop: "30px",
        fontSize: "20px",
        textAlign: "center"
      }}>
        Last Updated: {data.last_updated || "Loading..."}
      </div>

      {/* ALERT BOX */}

      {
        data.risk_level === "High" && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: "#ff4d4d",
              padding: "20px",
              marginTop: "30px",
              borderRadius: "15px",
              textAlign: "center",
              fontSize: "22px",
              fontWeight: "bold",
              boxShadow: "0 0 20px rgba(255,0,0,0.5)"
            }}
          >

            ⚠ HIGH CROWD ALERT — Immediate Attention Required!

          </motion.div>
        )
      }

      {/* MAP */}

      <CrowdMap places={places} />

      {/* CHART */}

      <CrowdChart />

    </div>
  );
}

const cardStyle = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.1)",
  padding: "30px",
  borderRadius: "20px",
  textAlign: "center",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  transition: "0.3s"
};

export default App;