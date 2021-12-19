import { HeaderLink, HeaderStyled } from './styles';

const Header = () => {
	return (
		<HeaderStyled>
			<HeaderLink to='/'>Legenda</HeaderLink> |{' '}
			<HeaderLink to='codes'>Códigos</HeaderLink>
		</HeaderStyled>
	);
};

export default Header;
