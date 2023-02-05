import React, { useState, useEffect, useRef } from "react";
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
  const [newImages, setNewImages] = useState(false);
  let mounted = useRef(false);
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
      const response = await fetch(url);
      const data = await response.json();

      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setNewImages(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchImages();
  }, [page]);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newImages) return;
    if (loading) {
      return;
    }
    setPage((oldPage) => {
      return oldPage + 1;
    });
    console.log("second");
  }, [newImages]);
  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 1) {
      setNewImages(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => {
      window.removeEventListener("scroll", event);
    };
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    if (page === 1) {
      fetchImages();
    }
    setPage(1);
  };

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
