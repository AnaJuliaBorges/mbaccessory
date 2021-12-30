import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderStyled = styled.header`
	background-color: #35005c;
	display: flex;
	gap: 40px;
	padding: 20px 50px;
	align-items: center;
`;

export const Logo = styled.img`
	width: 60px;
`;

export const ButtonContainer = styled.nav`
	display: flex;
	gap: 20px;

	& Link {
		color: #fff;
		text-decoration: none;
	}
`;

export const LinkStyled = styled(Link)`
	color: #fff;
	text-decoration: none;

	&:hover{
		color: #e5bead;
	}
`

