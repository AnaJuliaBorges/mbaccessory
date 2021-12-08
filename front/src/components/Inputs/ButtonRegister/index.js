import { ButtonStyle } from './styles';

export const ButtonRegister = ({ name, ...props }) => {
	return <ButtonStyle {...props}>{name}</ButtonStyle>;
};
