import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
import "./App.css";
const mainUrl = "https://api.unsplash.com/photos/";
const searchUrl = "https://api.unsplash.com/search/photos/";

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlQuery = `&query=${query}`;
    if (query) {
      url = `${searchUrl}?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}${urlQuery}`;
    } else {
      url = `${mainUrl}?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}`;
    }

    try {
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setPhotos((oldPhotos) => {
        if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      console.log(data);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchImages();
  }, [page]);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImages();
    console.log("ss");
  };
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight
      ) {
        console.log("dziala");
        setPage(page + 1);
      }
    });
    return () => {
      window.removeEventListener("scroll", event);
    };
  }, []);
  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            type="text"
            placeholder="search"
            className="form-input"
          />
          <button className="submit-btn" type="submit" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((item, idx) => {
            return <Photo key={idx} {...item} />;
          })}
        </div>
        {loading && <h1>Loading...</h1>}
      </section>
    </main>
  );
}

export default App;
