import {InputSelectStyle} from './styles.js';

const InputSelect = ({ options, noSelect, ...props }) => {

return (<InputSelectStyle {...props}>
		{noSelect && <option key={'none'}>{noSelect}</option>}
		{options.map((option) => (
			<option key={option.name} value={option.name}>{option.name}</option>
		))}
	</InputSelectStyle>);
};

export default InputSelect;
