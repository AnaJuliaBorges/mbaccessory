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
	ContainerRegister,
	HomeContainer,
	Message,
	Texts,
	ContainerList,
	CheckboxContainer,
	SectionTitle,
} from './styles';

const Legend = () => {
	const [name, setName] = useState('');
	const [code, setCode] = useState('');
	const [characteristics, setCharacteristics] = useState(false);
	const [product, setProduct] = useState(false);

	const {
		getLegend,
		createLegend,
		deleteLegend,
		zerarIdLegend,
		legend,
		loading,
		errorMessage,
		setErrorMessage,
	} = useContext(LegendContext);

	const colsLegend = [
		{ name: 'Nome', campoAPI: 'name', size: '40%' },
		{ name: 'Código', campoAPI: 'code', size: '30%' },
		{ name: 'Último', campoAPI: 'lastId', size: '30%' },
		
	];

	useEffect(() => {
		getLegend();
	}, []);

	const handleRegister = () => {
		console.log({characteristics})
		createLegend(name, code, characteristics, product);
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

					<CheckboxContainer>
						<Checkbox
							name='É uma característica'
							checked={characteristics}
							onClick={() => setCharacteristics(!characteristics)}
						/>

						<Checkbox
							name='É um produto'
							checked={product}
							onClick={() => setProduct(!product)}
						/>
					</CheckboxContainer>

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
				<ContainerList>
					<div>
						<SectionTitle>Matéria Prima</SectionTitle><hr/>
						<TableList colums={colsLegend}>
							{legend.filter(curr => !curr.characteristics).map(item => (
								<TableBody
									zeroFunction={zerarIdLegend}
									key={item._id}
									row={item}
									columns={colsLegend}
									deleteFunction={deleteLegend}
								/>
							))}
						</TableList>
					</div>
					<div>
						<SectionTitle>Características</SectionTitle><hr/>
						<TableList colums={colsLegend}>
							{legend.filter(curr => curr.characteristics).map(item => (
								<TableBody
									zeroFunction={zerarIdLegend}
									key={item._id}
									row={item}
									columns={colsLegend}
									deleteFunction={deleteLegend}
								/>
							))}
						</TableList>

						<SectionTitle>Produtos</SectionTitle><hr/>
						<TableList colums={colsLegend}>
							{legend.filter(curr => curr.product).map(item => (
								<TableBody
									zeroFunction={zerarIdLegend}
									key={item._id}
									row={item}
									columns={colsLegend}
									deleteFunction={deleteLegend}
								/>
							))}
						</TableList>
					</div>
				</ContainerList>
			) : (
				<Message>Nenhuma legenda cadastrada</Message>
			)}
		</HomeContainer>
	);
};

export default Legend;
