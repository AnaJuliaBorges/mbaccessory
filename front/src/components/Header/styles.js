import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { defaulTheme } from '../../globalStyle';

const { colors } = defaulTheme;

export const HeaderStyled = styled.header`
	background-color: ${colors.primary};
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
`;

export const HeaderLink = styled(Link)`
	text-decoration: none;
`;
