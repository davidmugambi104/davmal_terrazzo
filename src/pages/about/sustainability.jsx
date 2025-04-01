// Sustainability.jsx
import React, { useState, useEffect } from 'react';
import { BarChart, PieChart, CartesianGrid, Bar, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import Timeline from './Timeline';
import SustainabilityMilestones from './SustainabilityMilestones';
import './Sustainability.css';

const Sustainability = () => {
  const [activeTab, setActiveTab] = useState('progress');
  const [metrics, setMetrics] = useState({});
  const [timelineData, setTimelineData] = useState([]);
  const [currentYearData, setCurrentYearData] = useState({});

  useEffect(() => {
    // Simulated API calls
    fetch('/api/sustainability-metrics')
      .then(res => res.json())
      .then(data => setMetrics(data));

    fetch('/api/sustainability-timeline')
      .then(res => res.json())
      .then(data => setTimelineData(data));

    // Real-time updates
    const ws = new WebSocket('wss://sustainability-updates.example.com');
    ws.onmessage = (event) => {
      setCurrentYearData(JSON.parse(event.data));
    };

    return () => ws.close();
  }, []);

  const renderChart = () => {
    switch(activeTab) {
      case 'emissions':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={metrics.emissionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="co2" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'materials':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={metrics.materialBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
              >
                {metrics.materialBreakdown.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return <ProgressDashboard metrics={metrics} />;
    }
  };

  return (
    <div className="sustainability-page">
      <div className="impact-header">
        <h1>Our Sustainability Journey</h1>
        <div className="live-metrics">
          <MetricBadge
            label="CO2 Saved Today"
            value={`${currentYearData.dailyCO2 || 0} kg`}
            icon="🌱"
          />
          <MetricBadge
            label="Renewable Energy"
            value={`${currentYearData.energyMix || 0}%`}
            icon="☀️"
          />
        </div>
      </div>

      <nav className="sustainability-nav">
        {['progress', 'emissions', 'materials'].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderChart()}
      </motion.div>

      <SustainabilityMilestones milestones={timelineData} />

      <div className="certifications-section">
        <h2>Our Certifications</h2>
        <div className="certifications-grid">
          {metrics.certifications?.map(cert => (
            <CertificationCard key={cert.name} {...cert} />
          ))}
        </div>
      </div>

      <Timeline events={timelineData} />
    </div>
  );
};

const ProgressDashboard = ({ metrics }) => (
  <div className="progress-grid">
    <ProgressRing
      label="Carbon Neutrality"
      progress={metrics.carbonNeutrality || 0}
      targetYear={2025}
    />
    <ProgressRing
      label="Waste Reduction"
      progress={metrics.wasteReduction || 0}
      targetYear={2024}
    />
    <ProgressRing
      label="Renewable Energy"
      progress={metrics.renewableEnergy || 0}
      targetYear={2023}
    />
  </div>
);

export default Sustainability;