import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Container } from './globalStyle';

import Legend from './pages/Legend';
import Codes from './pages/Codes';
import { LegendStorage } from './contexts/legendContext';
import { CodeStorage } from './contexts/codeContext';
import Extras from './pages/Extras';
import { ExtraStorage } from './contexts/extrasContext';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<LegendStorage>
				<ExtraStorage>
					<CodeStorage>
						<Container>
							<Routes>
								<Route path='/' element={<Legend />} />
								<Route path='/codes' element={<Codes />} />
								<Route path='/extras' element={<Extras />} />
							</Routes>
						</Container>
					</CodeStorage>
				</ExtraStorage>
			</LegendStorage>
		</BrowserRouter>
	);
};

export default App;
