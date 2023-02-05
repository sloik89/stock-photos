import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
import "./App.css";
const mainUrl = "https://api.unsplash.com/photos/";
const ulr =
  "https://api.unsplash.com/photos/?client_id=1Z6T5pdgenta7gqB5B6T5zqeumF1Ka5y_8ibCeBsiUY";

function App() {
  console.log(process.env.REACT_APP_ACCESS_KEY);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const fetchImages = async () => {
    setLoading(true);
    let url;
    url = `${mainUrl}?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setPhotos(data);
      console.log(data);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ss");
  };
  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" placeholder="search" className="form-input" />
          <button className="submit-btn" type="submit" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((item, idx) => {
            console.log(item);
            return <Photo key={idx} {...item} />;
          })}
        </div>
        {loading && <h1>Loading...</h1>}
      </section>
    </main>
  );
}

export default App;
