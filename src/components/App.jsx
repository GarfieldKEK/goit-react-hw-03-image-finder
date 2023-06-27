import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import style from './styles.module.css';

const API_KEY = '36289056-d3890f079fda9298d504367c5';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );

        const newImages = response.data.hits.map((image) => ({
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
        }));

        setImages((prevImages) => [...prevImages, ...newImages]);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery === '') return;

    fetchImages();
  }, [searchQuery, page]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={style.App}>
      <Searchbar onSubmit={handleSearch} />

      {images.length > 0 && (
        <ImageGallery>
          {images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={openModal}
            />
          ))}
        </ImageGallery>
      )}

      {isLoading && <Loader />}

      {images.length > 0 && !isLoading && (
        <Button onClick={loadMoreImages}>Load More</Button>
      )}

      {selectedImage && (
        <Modal image={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
