import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./css/Home.css";
import home1 from "./Images/home1.jpg"
import home2 from "./Images/home2.jpg"
import home3 from "./Images/home3.jpg"

function Home() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Hero images
  const heroImages = [home1, home2, home3];

  // Auto image change every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/book/getBookdata")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        setIsLoading(false);
      });
  }, []);

  const handleViewDetails = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const scrollToBooks = () => {
    document.getElementById("featured-books").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="home">
      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImages[currentImage]})` }}
      >
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h2 className="hero-title">Discover Your Next Great Read</h2>
          <p className="hero-subtitle">
            Explore a vast collection of books from various genres. Find your next adventure between the pages.
          </p>
          <button className="btn-primary" onClick={scrollToBooks}>
            Explore Books
          </button>
        </div>
        
        {/* Hero image indicators */}
        <div className="hero-indicators">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentImage ? 'active' : ''}`}
              onClick={() => setCurrentImage(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="featured-books" id="featured-books">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">Featured Books</h3>
            <p className="section-subtitle">Curated selection of our most popular titles</p>
          </div>
          
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading books...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="no-books">
              <p>No books available at the moment.</p>
            </div>
          ) : (
            <div className="book-grid">
              {books.map((book) => (
                <div className="book-card" key={book.id}>
                  <div className="book-image-container">
                    <img
                      src={
                        book.cover
                          ? `http://localhost:5000/uploads/${book.cover}`
                          : "/no-cover.png"
                      }
                      alt={`Cover of ${book.title} by ${book.author}`}
                      className="book-image"
                      loading="lazy"
                    />
                    <div className="book-overlay">
                      <button
                        className="btn-view-details"
                        onClick={() => handleViewDetails(book.id)}
                      >
                        Quick View
                      </button>
                    </div>
                  </div>

                  <div className="book-info">
                    <h4 className="book-title">{book.title}</h4>
                    <p className="book-author">by {book.author}</p>
                    <div className="book-meta">
                      <p className="book-price">₹{book.price}</p>
                      <button
                        className="btn-secondary"
                        onClick={() => handleViewDetails(book.id)}
                        aria-label={`View details about ${book.title}`}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for new book arrivals, special offers, and literary events.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                aria-label="Your email address"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;