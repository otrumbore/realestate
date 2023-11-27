import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ListingPage from './pages/ListingPage';

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/listing/:listingId' element={<ListingPage />} />
				{/* Other routes */}
			</Routes>
		</>
	);
}

export default App;
