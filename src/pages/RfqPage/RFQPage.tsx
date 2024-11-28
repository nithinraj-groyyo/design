import React, { useEffect, useState } from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import { Box, Tab, Tabs } from '@mui/material'
import AddRFQ from './AddRFQ'
import UserRFQList from './UserRFQList'
import { useLocation } from 'react-router-dom'

const RFQPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get("tab");

    if (tabParam === "rfq-list") {
      setActiveTab(1);
    } else {
      setActiveTab(0); 
    }
  }, [location.search]);

  return (
    <BasicLayout>
      <div className="w-full mt-[10rem] p-6 sm:p-8 md:p-10 bg-gray-50 flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8 rounded-lg shadow-lg">
        <div className="md:w-[35%]  p-6 rounded-lg text-white">
          <div className="mb-4 bg-[#1E201E] rounded-lg">
            <img
              alt="Contact Us"
              src="/images/DummyImages/contact.png"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
        
        <div className="md:w-[65%] bg-white p-4 sm:p-6 rounded-lg shadow-lg">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              variant="fullWidth" 
              sx={{ '& .MuiTab-root': { color: 'text.primary', fontWeight: 'bold' } }}
            >
              <Tab label="Add RFQ" />
              <Tab label="RFQ Logs" />
            </Tabs>
          </Box>

          <Box sx={{ paddingTop: 2 }}>
            {activeTab === 0 && <AddRFQ />}
            {activeTab === 1 && <UserRFQList />}
          </Box>
        </div>
      </div>
    </BasicLayout>
  )
}

export default RFQPage
