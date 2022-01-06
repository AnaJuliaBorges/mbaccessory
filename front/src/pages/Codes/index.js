import { useContext, useEffect, useState } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ButtonRegister } from '../../components/Inputs/ButtonRegister';
import InputSelect from '../../components/Inputs/InputSelect';
import { InputText } from '../../components/Inputs/InputText';
import Loading from '../../components/Loading';
import TableList from '../../components/TableList';
import TableBody from '../../components/TableList/TableBody';
import { CodeContext } from '../../contexts/codeContext';
import { LegendContext } from '../../contexts/legendContext';
import {
	ContainerInputs,
	ContainerRegister,
	HomeContainer,
	Texts,
	LabelStyled,
	FirstLine,
	SecondLine,
	LabelInput,
	LastCode,
	ContainerCode,
	ContainerList,
} from './styles';

const Codes = () => {
	const [codeCreated, setCodeCreated] = useState([]);

	const {
		getCodes,
		createCode,
		deleteCode,
		codes,
		loading,
		errorMessage,
		lastCode,
		setErrorMessage,
	} = useContext(CodeContext);
	
	const { legend, getLegend } = useContext(LegendContext);

	const handleInput = (e) => {
		setCodeCreated((curr) => ({ ...curr, [e.target.name]: e.target.value }));
	};

	const colsCodes = [
		{ name: 'Código', campoAPI: 'code', size: '10%' },
		{ name: 'Categoria', campoAPI: 'category', size: '10%' },
		{ name: 'Descrição', campoAPI: 'description', size: '25%' },
		{ name: 'Local de Compra', campoAPI: 'placePurchase', size: '15%' },
		{ name: 'Inicial', campoAPI: 'initialQuantity', size: '10%' },
		{ name: 'Total', campoAPI: 'totalPrice', size: '10%', type: 'price' },
		{ name: 'Unitário', campoAPI: 'unitPrice', size: '10%', type: 'price' },
		{ name: 'Estoque', campoAPI: 'inventory', size: '10%' },
	];

	const categories = [
		{name: 'Acabamento', categories: ['Ponteira', 'Tulipa']},
		{name: 'Alfinete', categories: ['Alfinete']},
		{name: 'Brinco', categories: ['Anzol', 'Argola', 'Pino de brinco', 'Tarracha']},
		{name: 'Corrente', categories: ['Alongador', 'Arame', 'Cabelo de Anjo', 'Corrente']},
		{name: 'Elo', categories: ['Elo', 'Terminal']},
		{name: 'Entremeio', categories: ['Entremeio']},
		{name: 'Fecho', categories: ['Fecho']},
		{name: 'Pedraria', categories: ['Pedra', 'Plástico', 'Cristal', 'Acrílico', 'Pérola', 'Resina']},
		{name: 'Pingente', categories: ['Pingente']},
		{name: 'Terminal', categories: ['Terminal']},

	]

	useEffect(() => {
		if(!legend.length) getLegend();
		getCodes();
	}, [])

	return (
		<HomeContainer>
			<h2>Códigos</h2>
			<ContainerRegister>
				<h4>Registre um Código</h4>
				<ContainerInputs>
					<Texts>
						<FirstLine>
							
						<LabelStyled>
							<LabelInput>Categoria</LabelInput>
							<InputSelect
								options={legend.filter(curr => !curr.characteristics)}
								name="category"
								value={codeCreated.category}
								onChange={(e) => {
									console.log('mudou');
									handleInput(e);
									setErrorMessage('');
								}}
							/>
						</LabelStyled>

						<LabelStyled>
							<LabelInput>Característica</LabelInput>
							<InputSelect
								noSelect="Nenhuma característica"
								options={legend.filter(curr => curr.characteristics)}
								name="characteristics"
								value={codeCreated.characteristics}
								onChange={(e) => {
									handleInput(e);
									setErrorMessage('');
								}}
							/>
						</LabelStyled>

						<LabelStyled>
							<LabelInput>Quantidade inicial</LabelInput>
							<InputText
								small
								type="number"
								name="initialQuantity"
								placeholder="Ex.: 150"
								value={codeCreated.initialQuantity}
								onChange={(e) => {
									handleInput(e);
									setErrorMessage('');
								}}
							/>
						</LabelStyled>
						<LabelStyled>
							<LabelInput>Preço total</LabelInput>
							<InputText
								small	
								type="number"
								name="totalPrice"
								placeholder="Ex.: 10,25"
								value={codeCreated.totalPrice}
								onChange={(e) => {
									handleInput(e);
									setErrorMessage('');
								}}
							/>
						</LabelStyled>
						<LabelStyled>
							<LabelInput>Local de Compra</LabelInput>
							<InputText
								name="placePurchase"
								placeholder="Ex.: Biju junior"
								value={codeCreated.placePurchase}
								onChange={(e) => {
									handleInput(e);
									setErrorMessage('');
								}}
							/>
						</LabelStyled>
						</FirstLine>
						<SecondLine>

						<LabelStyled>
							<LabelInput>Descrição</LabelInput>
							<InputText
								type="text"
								name="description"
								placeholder="Ex.: Corrente de bolinha"
								value={codeCreated.description}
								onChange={(e) => {
									handleInput(e);
									setErrorMessage('');
								}}
								style={{width: '500px'}}
							/>
						</LabelStyled>

						<ButtonRegister
							type="onSubmit"
							name="Registrar"
							onClick={() => createCode(codeCreated)}
						></ButtonRegister>

						<ContainerCode>
							<LastCode>Último código registrado: <span>{lastCode}</span></LastCode>
						</ContainerCode>

						</SecondLine>
					</Texts>
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
			) : (
				<div>
					{categories.map((category) => {
						const codesFiltered = codes.filter(curr => category.categories.includes(curr.category));
						
						return <ContainerList>
							<h3>{category.name}</h3>
							<hr />
							{codesFiltered.length ? 
								<TableList colums={colsCodes}>
									{codesFiltered.map((item) => (
										<TableBody
											key={item._id}
											row={item}
											columns={colsCodes}
											deleteFunction={deleteCode}
										/>
									))}
								</TableList>
								: <span>Nenhuma matéria prima cadastrada nesta categoria</span>
							}
						</ContainerList>
						
})}
				</div>
			)}
		</HomeContainer>
	);
};

export default Codes;
