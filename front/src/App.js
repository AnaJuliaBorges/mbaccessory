import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Container } from './globalStyle';

import Legend from './pages/Legend';
import Codes from './pages/Codes';
import { LegendStorage } from './contexts/legendContext';
import { CodeStorage } from './contexts/codeContext';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<LegendStorage>
			<CodeStorage>
				<Container>
					<Routes>
						<Route path='/' element={<Legend />} />
						<Route path='/codes' element={<Codes />} />
					</Routes>
				</Container>
			</CodeStorage>
			</LegendStorage>
		</BrowserRouter>
	);
};

export default App;
