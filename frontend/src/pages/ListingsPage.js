import { useEffect, useState } from 'react';
import { getAllListings } from '../api/listings';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Listings</h2>
      {listings.map(listing => (
        <div key={listing.id}>
          <h3>{listing.title}</h3>
          <p>{listing.neighborhood} · {listing.bedrooms} bed · ₪{listing.price.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default ListingsPage;