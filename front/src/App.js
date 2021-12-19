import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Container } from './globalStyle';

import Legend from './pages/Legend';
import Codes from './pages/Codes';
import { LegendStorage } from './contexts/legendContext';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<LegendStorage>
				<Container>
					<Routes>
						<Route path='/' element={<Legend />} />
						<Route path='/codes' element={<Codes />} />
					</Routes>
				</Container>
			</LegendStorage>
		</BrowserRouter>
	);
};

export default App;
