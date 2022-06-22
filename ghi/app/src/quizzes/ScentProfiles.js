import React, { useState, useEffect } from "react";
import { getTokenInternal } from "../authApi";

function ScentProfilesList() {
  const [homeScentProfiles, setHomeScentProfiles] = useState([]);
  const [bodyScentProfiles, setBodyScentProfiles] = useState([]);
  
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

      if (homeScentProfileResponse.ok) {
        setHomeScentProfiles(homeScentProfileData.home_scent_profiles);
      }
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

      if (bodyScentProfileResponse.ok) {
        setBodyScentProfiles(bodyScentProfileData.body_scent_profiles);
      }
    }
    getBodyScentProfileData();
    getHomeScentProfileData();
  }, []);

  return (
    <>
    <div id="home_scent_profiles">
      <h2>Home Scent Profiles</h2>
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
      </table>
    </div>
    </>
  );
}

export default ScentProfilesList;
