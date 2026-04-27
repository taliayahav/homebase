import { useEffect, useState } from 'react';
import { getAllListings } from '../api/listings';
import ListingCard from '../components/ListingCard';

function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllListings()
      .then(response => {
        setListings(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load listings');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="status-message">Loading listings...</p>;
  if (error) return <p className="status-message">{error}</p>;

  return (
    <div className="listings-page">
      <h2>Available Listings</h2>
      <div className="listings-grid">
        {listings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}

export default ListingsPage;
