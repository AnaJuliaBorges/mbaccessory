import { useEffect, useState } from 'react';
import api from '../../api';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ButtonRegister } from '../../components/Inputs/ButtonRegister';
import { InputText } from '../../components/Inputs/InputText';
import Loading from '../../components/Loading';
import TableList from '../../components/TableList';
import TableBody from '../../components/TableList/TableBody';
import {
	ContainerInputs,
	ContainerRegister,
	HomeContainer,
	Texts,
	LabelStyled,
	LabelInput,
} from './styles';

const Codes = () => {
	const [codes, setCodes] = useState([]);

	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [initialQuantity, setInitialQuantity] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [unitPrice, setUnitPrice] = useState(0);
	const [inventory, setInventory] = useState(0);

	const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const colsCodes = [
		{ name: 'Código', campoAPI: 'code', size: '10%' },
		{ name: 'Categoria', campoAPI: 'category', size: '15%' },
		{ name: 'Descrição', campoAPI: 'description', size: '20%' },
		{ name: 'Inicial', campoAPI: 'initialQuantity', size: '10%' },
		{ name: 'Total', campoAPI: 'totalPrice', size: '10%' },
		{ name: 'Unitário', campoAPI: 'unitPrice', size: '10%' },
		{ name: 'Estoque', campoAPI: 'inventory', size: '10%' },
	];

	const getCodes = () => {
		setLoading(true);

		api.get('/codes')
			.then((res) => {
				setCodes(
					res.data.codes.sort(
						(a, b) => (a.code > b.code) - (a.code < b.code)
					)
				);
				console.log(res.data.codes);
			})
			.catch((err) => {
				setErrorMessage(err.response.data.error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		getCodes();
	}, []);

	const handleRegister = () => {
		setErrorMessage('');
		setLoading(true);

		api.post('/codes', {
			category,
			description,
			image: null,
			initialQuantity,
			totalPrice,
		})
			.then((res) => {
				getCodes();
			})
			.catch((err) => {
				setErrorMessage(err.response.data.error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleDelete = (id) => {
		setLoading(true);
		api.delete(`/codes/${id}`)
			.then((res) => {
				getCodes();
			})
			.catch((err) => {
				setErrorMessage(err.response.data.error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<HomeContainer>
			<h2>Legenda</h2>
			<ContainerRegister>
				<h4>Registre uma Legenda</h4>
				<ContainerInputs>
					<Texts>
						<LabelStyled>
							<LabelInput>Descrição</LabelInput>
							<InputText
								type="text"
								placeholder="Descrição"
								value={description}
								onChange={(e) => {
									setDescription(e.target.value);
									setErrorMessage('');
								}}
							/>
						</LabelStyled>

						<LabelStyled>
							<LabelInput>Quantidade inicial</LabelInput>
							<InputText
								type="number"
								placeholder="Quantidade inicial"
								value={initialQuantity}
								onChange={(e) => {
									setInitialQuantity(e.target.value);
									setErrorMessage('');
								}}
							/>
						</LabelStyled>
						<LabelStyled>
							<LabelInput>Preço total</LabelInput>
							<InputText
								type="number"
								placeholder="Preço total"
								value={totalPrice}
								onChange={(e) => {
									setTotalPrice(e.target.value);
									setErrorMessage('');
								}}
							/>
						</LabelStyled>

						<ButtonRegister
							type="onSubmit"
							name="Registrar"
							onClick={handleRegister}
						></ButtonRegister>
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
					<TableList colums={colsCodes}>
						{codes.map((item) => (
							<TableBody
								key={item._id}
								row={item}
								columns={colsCodes}
								deleteFunction={handleDelete}
							/>
						))}
					</TableList>
				</div>
			)}
		</HomeContainer>
	);
};

export default Codes;
