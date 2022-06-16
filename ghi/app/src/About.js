import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "500px",
  height: "400px",
  margin: "auto",
};

const center = {
  lat: 35.730021586267675,
  lng: -68.82722431990157,
};

const first = {
  lat: 48.11271112874699,
  lng: -123.25529733000641,
};

const second = {
  lat: 37.89714687407647,
  lng: -122.58108551483562,
};

const third = {
  lat: 28.77160929137829,
  lng: -80.87334064699989,
};

const fourth = {
  lat: 4.706416496096941,
  lng: -74.0783312204099,
};

const fifth = {
  lat: 20.028575206175695,
  lng: -155.40941221503016,
};

const sixth = {
  lat: 46.16841885798829,
  lng: -89.357298399341,
};

const seventh = {
  lat: 40.73186359841101,
  lng: 16.25090145065388,
};

const eigth = {
  lat: 32.549392602956125,
  lng: -117.1041781190496,
};

const divStyle = {
  background: `white`,
  padding: 0,
  fontSize: "12px",
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });

  const [isMarker1Visible, setIsMarker1Visible] = useState(false);
  const [isMarker2Visible, setIsMarker2Visible] = useState(false);
  const [isMarker3Visible, setIsMarker3Visible] = useState(false);
  const [isMarker4Visible, setIsMarker4Visible] = useState(false);
  const [isMarker5Visible, setIsMarker5Visible] = useState(false);
  const [isMarker6Visible, setIsMarker6Visible] = useState(false);
  const [isMarker7Visible, setIsMarker7Visible] = useState(false);
  const [isMarker8Visible, setIsMarker8Visible] = useState(false);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
      <Marker position={first} onClick={() => setIsMarker1Visible(true)} />
      <Marker position={second} onClick={() => setIsMarker2Visible(true)} />
      <Marker position={third} onClick={() => setIsMarker3Visible(true)} />
      <Marker position={fourth} onClick={() => setIsMarker4Visible(true)} />
      <Marker position={fifth} onClick={() => setIsMarker5Visible(true)} />
      <Marker position={sixth} onClick={() => setIsMarker6Visible(true)} />
      <Marker position={seventh} onClick={() => setIsMarker7Visible(true)} />
      <Marker position={eigth} onClick={() => setIsMarker8Visible(true)} />
      {isMarker1Visible && (
        <InfoWindow
          position={first}
          onCloseClick={() => setIsMarker1Visible(false)}
        >
          <div style={divStyle}>
            <span>Lavendar, Rain</span>
          </div>
        </InfoWindow>
      )}
      {isMarker2Visible && (
        <InfoWindow
          position={second}
          onCloseClick={() => setIsMarker2Visible(false)}
        >
          <div style={divStyle}>
            <span>Resins, Moss, Bark, Pine Cone</span>
          </div>
        </InfoWindow>
      )}
      {isMarker3Visible && (
        <InfoWindow
          position={third}
          onCloseClick={() => setIsMarker3Visible(false)}
        >
          <div style={divStyle}>
            <span>Sweet Orange, Mandarin</span>
          </div>
        </InfoWindow>
      )}
      {isMarker4Visible && (
        <InfoWindow
          position={fourth}
          onCloseClick={() => setIsMarker4Visible(false)}
        >
          <div style={divStyle}>
            <span>Rose, Honeysuckle, Jasmine</span>
          </div>
        </InfoWindow>
      )}
      {isMarker5Visible && (
        <InfoWindow
          position={fifth}
          onCloseClick={() => setIsMarker5Visible(false)}
        >
          <div style={divStyle}>
            <span>Vanilla</span>
          </div>
        </InfoWindow>
      )}
      {isMarker6Visible && (
        <InfoWindow
          position={sixth}
          onCloseClick={() => setIsMarker6Visible(false)}
        >
          <div style={divStyle}>
            <span>Honey</span>
          </div>
        </InfoWindow>
      )}
      {isMarker7Visible && (
        <InfoWindow
          position={seventh}
          onCloseClick={() => setIsMarker7Visible(false)}
        >
          <div style={divStyle}>
            <span>Bergamot</span>
          </div>
        </InfoWindow>
      )}
      {isMarker8Visible && (
        <InfoWindow
          position={eigth}
          onCloseClick={() => setIsMarker8Visible(false)}
        >
          <div style={divStyle}>
            <span>Sage, Sea Spray</span>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

function About() {
  return (
    <>
      <div className="d-flex justify-content-center position-relative">
        <img
          src="/images/bannerimg.jpeg"
          height={300}
          width={null}
          style={{ objectFit: "cover", width: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: "100%",
            height: "200px",
            background: "#fff",
            opacity: "0.5",
          }}
        />
        <img
          src="/images/sbabout.png"
          height={200}
          width={null}
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </div>
      <div className="px-4 py-3 my-1 text-center">
        <h1 className="display-6 fw-bold">
          Making Bellis around the world happier through our Smellis
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Smelli Belli is an organic, ethically sourced home and body products
            brand that caters to every individual. Take our quizzes to see what
            scents and products we reccommend for you!
          </p>
        </div>
        <h1 className="display-6 fw-bold">FAQ</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4 fw-bold">
            Where do you source your ingredients?
          </p>
          <p className="lead mb-4">
            <Map />
            Here's a map showing the different locations we harvest ingredients
            to make the essential oils used in our fragrances! Click the markers
            to see which scent ingredients are harvested.
          </p>
          <p className="lead mb-4 fw-bold">Returns & Exchanges</p>
          <p className="lead mb-4">
            We want you to love our products! Return anything, anytime for any
            reason. 100% Guaranteed.
          </p>
          <p className="lead mb-4 fw-bold">What if my item arrives damaged?</p>
          <p className="lead mb-4">
            We're sorry to hear your item arrived damaged. Please contact us so
            we can make it right.
          </p>
          <p className="lead mb-4 fw-bold">
            Can I purchase Smelli Belli products in-store?
          </p>
          <p className="lead mb-4">
            Unfortunately, at the moment we are only an online store. We are
            looking to expand to retailers near you soon!
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
