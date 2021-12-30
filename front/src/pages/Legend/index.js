import { useContext, useEffect, useState } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ButtonRegister } from '../../components/Inputs/ButtonRegister';
import { Checkbox } from '../../components/Inputs/Checkbox';
import { InputText } from '../../components/Inputs/InputText';
import Loading from '../../components/Loading';
import TableList from '../../components/TableList';
import TableBody from '../../components/TableList/TableBody';
import { LegendContext } from '../../contexts/legendContext';
import {
	ContainerInputs,
	ContainerList,
	ContainerRegister,
	HomeContainer,
	Message,
	Texts,
} from './styles';

const Legend = () => {
	const [name, setName] = useState('');
	const [code, setCode] = useState('');
	const [characteristics, setCharacteristics] = useState(false);

	const {
		getLegend,
		createLegend,
		deleteLegend,
		legend,
		loading,
		errorMessage,
		setErrorMessage,
	} = useContext(LegendContext);

	const colsLegend = [
		{ name: 'Nome', campoAPI: 'name', size: '27%' },
		{ name: 'Código', campoAPI: 'code', size: '20%' },
		{ name: 'Último', campoAPI: 'lastId', size: '20%' },
		{ name: 'Característica', campoAPI: 'characteristics', size: '30%' },
	];

	useEffect(() => {
		//getLegend();
	}, []);

	const handleRegister = () => {
		createLegend(name, code, characteristics);
	};

	return (
		<HomeContainer>
			<h2>Legenda</h2>
			<ContainerRegister>
				<h4>Registre uma Legenda</h4>
				<ContainerInputs>
					<Texts>
						<InputText
							type='text'
							placeholder='Nome'
							value={name}
							onChange={e => {
								setName(e.target.value);
								setErrorMessage('');
							}}
						/>
						<InputText
							type='text'
							placeholder='Código'
							value={code}
							onChange={e => {
								setCode(e.target.value);
								setErrorMessage('');
							}}
						/>
						<ButtonRegister
							type='onSubmit'
							name='Registrar'
							onClick={handleRegister}
						></ButtonRegister>
					</Texts>

					<Checkbox
						name='É uma característica'
						checked={characteristics}
						onClick={() => setCharacteristics(!characteristics)}
					/>
				</ContainerInputs>
			</ContainerRegister>
			{errorMessage && (
				<ErrorMessage>
					{errorMessage}
					<br />
				</ErrorMessage>
			)}
			{loading ? (
				<Loading />
			) : legend.length ? (
				<div>
					<TableList colums={colsLegend}>
						{legend.map(item => (
							<TableBody
								key={item._id}
								row={item}
								columns={colsLegend}
								deleteFunction={deleteLegend}
							/>
						))}
					</TableList>
				</div>
			) : (
				<Message>Nenhuma legenda cadastrada</Message>
			)}
		</HomeContainer>
	);
};

export default Legend;
