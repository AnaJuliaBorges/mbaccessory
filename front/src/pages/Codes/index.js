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
import { formatPrice } from '../../utils/functions';
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
	TotalPrice,
	InputTextArea,
} from './styles';

const Codes = () => {
	const [codeCreated, setCodeCreated] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalUnitQuantity, setTotalUnitQuantity] = useState(0);

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
		console.log(codeCreated)
	};

	const colsCodes = [
		{ name: 'Código', campoAPI: 'code', size: '10%' },
		{ name: 'Código Antigo', campoAPI: 'oldCode', size: '10%' },
		{ name: 'Categoria', campoAPI: 'category', size: '10%' },
		{ name: 'Descrição', campoAPI: 'description', size: '25%' },
		{ name: 'Local de Compra', campoAPI: 'placePurchase', size: '15%' },
		{ name: 'Inicial', campoAPI: 'initialQuantity', size: '8%' },
		{ name: 'Total', campoAPI: 'totalPrice', size: '8%', type: 'price' },
		{ name: 'Unitário', campoAPI: 'unitPrice', size: '8%', type: 'price' },
		{ name: 'Estoque', campoAPI: 'inventory', size: '8%' },
		{ name: 'Caixa', campoAPI: 'box', size: '8%' },
	];

	const categories = [
		{name: 'Acabamento', categories: ['Ponteira', 'Tulipa']}, //MiniCompartimentos
		{name: 'Alfinete', categories: ['Alfinete']}, //Maleta
		{name: 'Brinco', categories: ['Brinco M']}, //Flor
		{name: 'Corrente', categories: ['Alongador', 'Arame', 'Cabelo de Anjo', 'Corrente']}, //2 Grandes
		{name: 'Elo', categories: ['Elo']}, //MiniCompartimento
		{name: 'Entremeio', categories: ['Entremeio']}, //MiniCompartimento
		{name: 'Fecho', categories: ['Fecho']}, //MiniCompartimento
		{name: 'Pedraria', categories: ['Pedra', 'Plástico', 'Cristal', 'Acrílico', 'Pérola', 'Resina']}, //Pedras não redondas caixa média, Pérolas, Cristal facetado e redondos caixa movel
		{name: 'Pingente', categories: ['Pingente']}, //Caixa de pingente
		{name: 'Terminal', categories: ['Terminal']}, //MiniCompartimento

	]

	useEffect(() => {
		if(!legend.length) getLegend();
		getCodes();
	}, [])
	
	useEffect(() => {
		let totalPriceSum = 0; 
		let totalQuantity = 0; 
		for (let i = 0; i < codes.length; i++) {
			if(codes[i].description !== 'Miçanga'){
				totalPriceSum += codes[i].totalPrice;
				totalQuantity++;
			}
		}
		setTotalPrice(totalPriceSum);
		setTotalUnitQuantity(totalQuantity);
	}, [codes])

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
								options={legend.filter(curr => !curr.characteristics && !curr.product)}
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
								placeholder="Ex.: Bijunior"
								value={codeCreated.placePurchase}
								onChange={(e) => {
									handleInput(e);
									setErrorMessage('');
								}}
							/>
						</LabelStyled>
						<LabelStyled>
							<LabelInput>Caixa</LabelInput>
							<InputText
								name="box"
								placeholder="Ex.: 1"
								value={codeCreated.box}
								onChange={(e) => {
									handleInput(e);
									setErrorMessage('');
								}}
							/>
						</LabelStyled>
						</FirstLine>
						<SecondLine>
						<LabelStyled>
							<LabelInput>Código antigo</LabelInput>
							<InputText
								name="oldCode"
								placeholder="FEASDAS12"
								value={codeCreated.oldCode}
								onChange={(e) => {
									handleInput(e);
									setErrorMessage('');
								}}
							/>
						</LabelStyled>
						
						<LabelStyled>
							<LabelInput>Descrição</LabelInput>
							<InputTextArea
								type="text"
								name="description"
								placeholder="Ex.: Corrente de bolinha"
								value={codeCreated.description}
								onChange={(e) => {
									handleInput(e);
									setErrorMessage('');
								}}
							/>
						</LabelStyled>

						

						<ButtonRegister
							type="onSubmit"
							name="Registrar"
							onClick={() => createCode(codeCreated)}
						></ButtonRegister>
						<ContainerCode>
							<LastCode>Último código registrado: <span>{lastCode}</span></LastCode>
							{codes.length > 0 && <TotalPrice>Valor total de compras: <span>{formatPrice(totalPrice)}</span></TotalPrice>}
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
			<hr />
			<span style={{float: 'right', marginTop: '10px'}}>Total: {totalUnitQuantity}</span>
		</HomeContainer>
	);
};

export default Codes;
