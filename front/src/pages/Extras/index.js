import { useContext, useEffect, useState } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ButtonRegister } from '../../components/Inputs/ButtonRegister';
import { InputText } from '../../components/Inputs/InputText';
import Loading from '../../components/Loading';
import TableList from '../../components/TableList';
import TableBody from '../../components/TableList/TableBody';
import { ExtrasContext } from '../../contexts/extrasContext';
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
	ContainerCode,
	TotalPrice,
} from './styles';

const Extras = () => {
	const [extraCreated, setExtraCreated] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);

	const {
		getExtras,
		createExtra,
		deleteExtra,
		extras,
		loading,
		errorMessage,
		setErrorMessage,
	} = useContext(ExtrasContext);
	
	const handleInput = (e) => {
		setExtraCreated((curr) => ({ ...curr, [e.target.name]: e.target.value }));
	};

	const colsCodes = [
		{ name: 'Nome', campoAPI: 'name', size: '25%' },
		{ name: 'Descrição', campoAPI: 'description', size: '35%' },
		{ name: 'Inicial', campoAPI: 'initialQuantity', size: '10%' },
		{ name: 'Total', campoAPI: 'totalPrice', size: '10%', type: 'price' },
		{ name: 'Unitário', campoAPI: 'unitPrice', size: '10%', type: 'price' },
		{ name: 'Estoque', campoAPI: 'inventory', size: '10%' },
	];

	// const categories = [
	// 	{name: 'Acabamento', categories: ['Ponteira', 'Tulipa']},
	// 	{name: 'Alfinete', categories: ['Alfinete']},
	// 	{name: 'Brinco', categories: ['Anzol', 'Argola', 'Pino de brinco', 'Tarracha']},
	// 	{name: 'Corrente', categories: ['Alongador', 'Arame', 'Cabelo de Anjo', 'Corrente']},
	// 	{name: 'Elo', categories: ['Elo', 'Terminal']},
	// 	{name: 'Entremeio', categories: ['Entremeio']},
	// 	{name: 'Fecho', categories: ['Fecho']},
	// 	{name: 'Pedraria', categories: ['Pedra', 'Plástico', 'Cristal', 'Acrílico', 'Pérola', 'Resina']},
	// 	{name: 'Pingente', categories: ['Pingente']},
	// 	{name: 'Terminal', categories: ['Terminal']},

	// ]

	useEffect(() => {
		if(!extras.length) getExtras();
	}, [])
	
	useEffect(() => {
		let totalPriceSum = 0; 
		for (let i = 0; i < extras.length; i++) {
			totalPriceSum += extras[i].totalPrice;
		}
		setTotalPrice(totalPriceSum);
	}, [extras])

	return (
		<HomeContainer>
			<h2>Extras</h2>
			<ContainerRegister>
				<h4>Registre um Extra</h4>
				<ContainerInputs>
					<Texts>
						<FirstLine>
							
						<LabelStyled>
							<LabelInput>Nome</LabelInput>
							<InputText
								small
								name="name"
								placeholder="Ex.: Sacola"
								value={extraCreated.name}
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
								value={extraCreated.initialQuantity}
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
								value={extraCreated.totalPrice}
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
								value={extraCreated.description}
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
							onClick={() => createExtra(extraCreated)}
						></ButtonRegister>
						<ContainerCode>
							{extras.length > 0 && <TotalPrice>Valor total de compras: <span>{formatPrice(totalPrice)}</span></TotalPrice>}
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
					{extras.length ? 
						<TableList colums={colsCodes}>
							{extras.map((item) => (
								<TableBody
									key={item._id}
									row={item}
									columns={colsCodes}
									deleteFunction={deleteExtra}
								/>
							))}
						</TableList>
						: <span>Nenhuma matéria prima cadastrada nesta categoria</span>
					}
				</div>
			)}
		</HomeContainer>
	);
};

export default Extras;
