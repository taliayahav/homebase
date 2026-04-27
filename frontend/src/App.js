import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListingsPage from './pages/ListingsPage';
import ListingDetailPage from './pages/ListingDetailPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Homebase</h1>
        <Routes>
          <Route path="/" element={<ListingsPage />} />
          <Route path="/listings/:id" element={<ListingDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
