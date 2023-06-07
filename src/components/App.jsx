import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';

const API_KEY = "36289056-d3890f079fda9298d504367c5";

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    isLoading: false,
    selectedImage: null,
    page: 1,
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { searchQuery, page } = this.state;

    if (searchQuery === '') return;

    this.setIsLoading(true);

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      const newImages = response.data.hits.map((image) => ({
        id: image.id,
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
      }));

      this.setState((prevState) => ({
        images: [...prevState.images, ...newImages],
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setIsLoading(false);
    }
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, images: [], page: 1 });
  };

  loadMoreImages = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  openModal = (image) => {
    this.setState({ selectedImage: image });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  setIsLoading = (isLoading) => {
    this.setState({ isLoading });
  };

  render() {
    const { images, isLoading, selectedImage } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />

        {images.length > 0 && (
          <ImageGallery>
            {images.map((image) => (
              <ImageGalleryItem
                key={image.id}
                image={image}
                onClick={this.openModal}
              />
            ))}
          </ImageGallery>
        )}

        {isLoading && <Loader />}

        {images.length > 0 && !isLoading && (
          <Button onClick={this.loadMoreImages}>Load More</Button>
        )}

        {selectedImage && (
          <Modal image={selectedImage} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

App.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default App;
