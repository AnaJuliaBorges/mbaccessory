import styled from 'styled-components';
import { defaultTheme } from '../../../globalStyle';

export const InputStyle = styled.input`
	width: 250px;
	height: 40px;
	padding-left: 10px;
	border: 1px solid #808080;
	border-radius: 5px;

	&:focus{
		border-color: ${defaultTheme.colors.primary};
	}
`;
