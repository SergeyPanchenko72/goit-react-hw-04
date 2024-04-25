import css from "./App.module.css";
import { useEffect, useState } from "react";
import { fetchImages } from "../../articles-api";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    if (query === "") {
      return;
    }
    async function getImages() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchImages(query, page);
        setImages((prevImages) => {
          return [...prevImages, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [query, page]);

  function openModal(fullImage) {
    setShowModal(true);
    setModalImage(fullImage);
  }
  function closeModal() {
    setShowModal(false);
  }
  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {error && <b>Oops! There was an error! Please reload!r</b>}
      {images.length > 0 && (
        <ImageGallery items={images} openModal={openModal} />
      )}
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {showModal && (
        <ImageModal
          modalImage={modalImage}
          openModal={openModal}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default App;
