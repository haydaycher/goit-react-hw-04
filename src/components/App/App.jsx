import { useState, useEffect } from "react";
import { fetchArticles } from "../services/api";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import css from "../App/App.module.css";
import ReactModal from "react-modal";
import { Toaster } from "react-hot-toast";
// import { ErrorMessage } from "formik";

ReactModal.setAppElement("#root");

export default function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(999);

  useEffect(() => {
    if (!query) return;

    const getArticles = async () => {
      try {
        setIsLoading(true);
        setIsError(null);
        const data = await fetchArticles(page, query);
        console.log(data);
        if (Array.isArray(data.results)) {
          setArticles((prev) => [...prev, ...data.results]);
        } else {
          console.error("data.results is not an array", data.results);
        }
        setTotalPages(data.total_pages);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, [page, query]);

  const handleSetQuery = (topic) => {
    setQuery(topic);
    setArticles([]);
    setPage(1);
  };

  const handleChangePage = () => {
    setPage((prev) => prev + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSetQuery} />

      {isError && (
        <ErrorMessage message="Something went wrong. Please try again." />
      )}

      <ImageGallery articles={articles} openModal={openModal} />

      {isLoading && <Loader />}
      {articles.length > 0 && !isLoading && page < totalPages && (
        <LoadMoreBtn onClick={handleChangePage} />
      )}

      {query && articles.length === 0 && !isLoading && (
        <p>No articles found.</p>
      )}

      {showModal && selectedImage && (
        <ImageModal
          isOpen={showModal}
          onRequestClose={closeModal}
          image={selectedImage}
        />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
