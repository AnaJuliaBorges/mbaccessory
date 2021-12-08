const InputSelect = ({ options }) => {
	<select>
		{options.map((option) => (
			<option value={option.name}>{option.name}</option>
		))}
	</select>;
};

export default InputSelect;
