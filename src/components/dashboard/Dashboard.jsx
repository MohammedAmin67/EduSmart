import React from 'react';
import ProgressOverview from './ProgressOverview';
import ContinueLearning from './ContinueLearning';

const Dashboard = ({ setActiveTab }) => (
  <div className="container mx-auto px-4 py-10 animate-fadeIn">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
      <div className="lg:col-span-1">
        <ProgressOverview />
      </div>
      <div className="lg:col-span-2">
        <ContinueLearning setActiveTab={setActiveTab} />
      </div>
    </div>
  </div>
);

export default Dashboard;