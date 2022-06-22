import React, { useState, useEffect } from "react";
import { getTokenInternal } from "../authApi";

function scentProfileColumns() {

}

function ScentProfilesList() {
  const [homeScentProfileColumns, setHomeScentProfileColumns] = useState([[], []]);
  const [bodyScentProfileColumns, setBodyScentProfileColumns] = useState([[], []]);
  
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

      const homeProfileColumns = [[], []];

      let i = 0;
      for (const homeScentProfile of homeScentProfiles) {
        homeProfileColumns[i].push(homeScentProfile);
        i += 1;
        if (i > 1) {
          i = 0;
        }
      }
      console.log("What are inside the Home Profile Columns?", homeProfileColumns);
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

      const bodyProfileColumns = [[], []];

      let i = 0;
      for (const bodyScentProfile of bodyScentProfiles) {
        bodyProfileColumns[i].push(bodyScentProfile);
        i += 1;
        if (i > 1) {
          i = 0;
        }
      }
      console.log("What are inside the Body Profile Columns?", bodyProfileColumns);
      setBodyScentProfileColumns(bodyProfileColumns);
    }

    getHomeScentProfileData();
    getBodyScentProfileData();
  }, []);

  return (
    <>
    <div id="home_scent_profiles">
      <h2>Home Scent Profiles</h2>
      {/* <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Product Category</th>
            <th>Scent Profile #1</th>
            <th>Scent Profile #2</th>
            <th>Scent Intensity</th>
          </tr>
        </thead>
        <tbody>
          {homeScentProfiles.map((scentProfile, index) => {
            return (
              <tr key={index}>
                <td>{scentProfile.created}</td>
                <td>{scentProfile.answer_1}</td>
                <td>{scentProfile.answer_2}</td>
                <td>{scentProfile.answer_3}</td>
                <td>{scentProfile.answer_5}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div id="body_scent_profiles">
      <h2>Body Scent Profiles</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Product Category</th>
            <th>Scent Profile #1</th>
            <th>Scent Profile #2</th>
            <th>Scent Intensity</th>
          </tr>
        </thead>
        <tbody>
          {bodyScentProfiles.map((scentProfile, index) => {
            return (
              <tr key={index}>
                <td>{scentProfile.created}</td>
                <td>{scentProfile.answer_1}</td>
                <td>{scentProfile.answer_2}</td>
                <td>{scentProfile.answer_3}</td>
                <td>{scentProfile.answer_5}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </div>
    </>
  );
}

export default ScentProfilesList;
