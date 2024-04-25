import css from "./App.module.css";
import { useEffect, useState } from "react";
import { fetchImages } from "../../articles-api";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    if (newQuery === "") {
      toast.error(
        "Sorry, the search data is empty. Please enter your request again!"
      );
    }
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
        setRequestError(false);
        setLoading(true);
        const data = await fetchImages(query, page);
        setImages((prevImages) => {
          return [...prevImages, ...data];
        });
      } catch (error) {
        setRequestError(true);
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
      {requestError && <b>Oops! There was an error! Please reload!</b>}
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
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
