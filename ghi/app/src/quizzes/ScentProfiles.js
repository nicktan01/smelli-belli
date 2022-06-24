import React, { useState, useEffect } from "react";
import { getTokenInternal } from "../authApi";
import BodyScentProfileColumn from "../components/BodyScentProfileColumn";
import HomeScentProfileColumn from "../components/HomeScentProfileColumn";

function ScentProfilesList() {
  const [homeScentProfileColumns, setHomeScentProfileColumns] = useState([[], [], [], []]);
  const [bodyScentProfileColumns, setBodyScentProfileColumns] = useState([[], [], [], []]);
  
  useEffect(() => {
    
    async function getHomeScentProfileData() {
      const token = await getTokenInternal();
      const homeUrl = `${process.env.REACT_APP_CUSTOMER_HOST}/api/homequizzes/`;
      const fetchConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
      const homeScentProfileResponse = await fetch(homeUrl, fetchConfig);
      const homeScentProfileData = await homeScentProfileResponse.json();
      
      const homeScentProfiles = [];
      if (homeScentProfileResponse.ok) {
        for (let scentProfile of homeScentProfileData.home_scent_profiles) {
          homeScentProfiles.push(scentProfile);
        }
      }

      const homeProfileColumns = [[], [], [], []];

      let i = 0;
      for (const homeScentProfile of homeScentProfiles) {
        homeProfileColumns[i].push(homeScentProfile);
        i += 1;
        if (i > 3) {
          i = 0;
        }
      }
      setHomeScentProfileColumns(homeProfileColumns);
    }
    
    async function getBodyScentProfileData() {
      const token = await getTokenInternal();
      const bodyUrl = `${process.env.REACT_APP_CUSTOMER_HOST}/api/bodyquizzes/`;
      const fetchConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }

      const bodyScentProfileResponse = await fetch(bodyUrl, fetchConfig);
      const bodyScentProfileData = await bodyScentProfileResponse.json();

      const bodyScentProfiles = [];
      if (bodyScentProfileResponse.ok) {
        for (let scentProfile of bodyScentProfileData.body_scent_profiles) {
          bodyScentProfiles.push(scentProfile);
        }
        // setBodyScentProfiles(bodyScentProfileData.body_scent_profiles);
      }

      const bodyProfileColumns = [[], [], [], []];

      let i = 0;
      for (const bodyScentProfile of bodyScentProfiles) {
        bodyProfileColumns[i].push(bodyScentProfile);
        i += 1;
        if (i > 3) {
          i = 0;
        }
      }
      setBodyScentProfileColumns(bodyProfileColumns);
    }

    getHomeScentProfileData();
    getBodyScentProfileData();
  }, []);

  return (
    <>
      <div 
        className="container" 
        id="home_scent_profiles"
      >
        <div className="px-5 py-5 my-5 text-center">
          <h2>Home Scent Profiles</h2>
        </div>
        <div className="px-5 py-5 my-5 text-center">
          <div className="row">
            {homeScentProfileColumns.map((homeScentProfileList, index) => {
              return (
                <HomeScentProfileColumn key={index} list={homeScentProfileList} />
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="container"
        id="body_scent_profiles"
      >
        <div className="px-5 py-5 my-5 text-center">
          <h2>Body Scent Profiles</h2>
        </div>
        <div className="px-5 py-5 my-5 text-center">
          <div className="row">
            {bodyScentProfileColumns.map((bodyScentProfileList, index) => {
              return (
                <BodyScentProfileColumn key={index} list={bodyScentProfileList} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ScentProfilesList;
