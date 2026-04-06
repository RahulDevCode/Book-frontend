import './css/Bookdetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false); // ✅ naya state
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/book/getBookdata/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching book:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(book);
    setAdded(true); // ✅ Add hone ke baad "View Cart" dikhega
  };

  if (loading) return <p className="loading">Loading book details...</p>;
  if (!book) return <p className="error">Book not found.</p>;

  return (
    <div className="book-details-wrapper">
      <div className="book-details-container">
        <div className="book-image">
          <img
            src={book.cover ? `http://localhost:5000/uploads/${book.cover}` : "/no-cover.png"}
            alt={book.title}
          />
        </div>
        <div className="book-info">
          <h2 className="book-title">{book.title}</h2>
          <p className="book-author"><strong>Author:</strong> {book.author}</p>
          <p className="book-category"><strong>Category:</strong> {book.category}</p>
          <p className="book-price"><strong>Price:</strong> ₹{book.price}</p>
          <p className="book-stock">
            <strong>Stock:</strong> {book.stock > 0 ? `${book.stock} available` : "Out of Stock"}
          </p>
          <p className="book-description">{book.description}</p>

          {!added ? (
            <button className="btn-add" onClick={handleAddToCart}>
              Add to Cart
            </button>
          ) : (
            <button className="btn-view" onClick={() => navigate("/cart")}>
              ✅ View Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
