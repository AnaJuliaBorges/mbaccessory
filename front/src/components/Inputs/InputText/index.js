import { InputStyle } from './styles';

export const InputText = ({small, ...props }) => {
	return <InputStyle type="text" {...props} style={{width: small && '150px'}} />;
};
