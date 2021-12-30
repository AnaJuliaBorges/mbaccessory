import { HeaderStyled, ButtonContainer, Logo, LinkStyled } from './styles';
import LogoMB from '../../logo.png'

const Header = () => {
	return( 
	<HeaderStyled>
		<Logo src={LogoMB}/>
		<ButtonContainer>
			<LinkStyled to="/">Legendas</LinkStyled>
			<LinkStyled to="codes">Códigos</LinkStyled>
		</ButtonContainer>
	</HeaderStyled>);
};

export default Header;
