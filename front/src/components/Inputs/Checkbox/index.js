import { CheckboxStyle, Label, ContainerCheckbox } from './styles';

export const Checkbox = ({ name, ...props }) => {
	return (
		<ContainerCheckbox>
			<CheckboxStyle type="checkbox" name={name} {...props} />
			<Label for={name}>{name}</Label>
		</ContainerCheckbox>
	);
};
