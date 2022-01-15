import styled from 'styled-components';

export const HomeContainer = styled.div`
	& h2 {
		margin-bottom: 20px;
	}
`;

export const ContainerRegister = styled.div`
	& h4 {
		margin-bottom: 10px;
	}
`;

export const ContainerInputs = styled.div`
	margin-bottom: 10px;
`;

export const Texts = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-bottom: 10px;
`;

export const LabelStyled = styled.label`
	display: flex;
	flex-direction: column;
`;

export const LabelInput = styled.span`
	margin-bottom: 5px;
`;

export const FirstLine = styled.div`
	width: 100%;
	display: flex;
	gap: 20px;
`;

export const SecondLine = styled.div`
	width: 100%;
	display: flex;
	gap: 20px;
	align-items: flex-end;
`;

export const ContainerCode = styled.div`
	height: 50px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 5px;
`;

export const ContainerList = styled.div`
	
	& h3{
		margin-top: 20px;
	}

	& hr {
		margin-bottom: 10px;
	}
`;

export const LastCode = styled.span`
	
	& span {
		font-weight: bold;
		color: green;
	}
`;

export const TotalPrice = styled.span`
	& span {
		font-weight: bold;
		color: red;
	}
`;
