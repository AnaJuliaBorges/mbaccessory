import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Container } from './globalStyle';

import Legend from './pages/Legend';
import Codes from './pages/Codes';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Container>
				<Routes>
					<Route path="/" element={<Legend />} />
					<Route path="/codes" element={<Codes />} />
				</Routes>
			</Container>
		</BrowserRouter>
	);
};

export default App;
