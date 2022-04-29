import styled from 'styled-components';

export const TableBodyStyled = styled.tbody``;
export const BodyRow = styled.td`
	width: ${(props) => props.size};
	height: 30px;
`;

export const DeleteCol = styled.td`
	color: red;
	cursor: pointer;
	gap: 10px;
`;

export const ZeroCol = styled.td`
	color: blue;
	cursor: pointer;
	margin-left: 10px;
`;

export const TableLine = styled.tr`
	&:hover{
		background-color: aliceblue;
	}
`;