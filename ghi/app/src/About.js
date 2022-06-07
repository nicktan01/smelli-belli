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
  lat: 39.9168964362773,
  lng: -97.28918834341877,
};

const first = {
  lat: 45.095625766512505,
  lng: -90.1261023337533,
};

const second = {
  lat: 37.77643143494803,
  lng: -122.49783318602427,
};

const third = {
  lat: 28.482933025633162,
  lng: -81.94180332953256,
};

const fourth = {
  lat: 30.314562513604184,
  lng: -94.56457882616958,
};

const divStyle = {
  background: `white`,
  padding: 0,
  fontSize: "12px",
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyApv58x4LhNOsfewdc59m5m5kWHqOzsSwU",
  });

  const [isMarker1Visible, setIsMarker1Visible] = useState(false);
  const [isMarker2Visible, setIsMarker2Visible] = useState(false);
  const [isMarker3Visible, setIsMarker3Visible] = useState(false);
  const [isMarker4Visible, setIsMarker4Visible] = useState(false);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={3}>
      <Marker position={first} onClick={() => setIsMarker1Visible(true)} />
      <Marker position={second} onClick={() => setIsMarker2Visible(true)} />
      <Marker position={third} onClick={() => setIsMarker3Visible(true)} />
      <Marker position={fourth} onClick={() => setIsMarker4Visible(true)} />
      {isMarker1Visible && (
        <InfoWindow
          position={first}
          onCloseClick={() => setIsMarker1Visible(false)}
        >
          <div style={divStyle}>
            <span>Cedarwood</span>
          </div>
        </InfoWindow>
      )}
      {isMarker2Visible && (
        <InfoWindow
          position={second}
          onCloseClick={() => setIsMarker2Visible(false)}
        >
          <div style={divStyle}>
            <span>Moss, Bark, Pine Cone</span>
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
            <span>Vanilla, Musk</span>
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
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-6 fw-bold">
        Making Bellis around the world happier through our Smellis
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Smelli Belli is an organic, ethically sourced home and body products
          brand that caters to every individual. Take our quiz to see what
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
          Here's a map showing the different locations we harvest ingredients to
          make the essential oils used in our fragrances! Click the markers to
          see which scent ingredients are harvested.
        </p>
        <p className="lead mb-4 fw-bold">Returns & Exchanges</p>
        <p className="lead mb-4">
          We want you to love our items! Return anything, anytime for any
          reason. 100% Guaranteed.
        </p>
        <p className="lead mb-4 fw-bold">What if my item arrives damaged?</p>
        <p className="lead mb-4">
          We're sorry to hear your item arrived damaged. Please contact us so we
          can make it right.
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
  );
}

export default About;

// key: AIzaSyCXyM88QxyPFMonzZyo46iRtxwLGVXUGZQ
// signature: 7PHOwQLF1VOYRU6YG27Bs4V4mOI=
// new signature: 51eok5djhJADeB0wo3wLLqqMAwU=

// Cindy key: AIzaSyApv58x4LhNOsfewdc59m5m5kWHqOzsSwU
