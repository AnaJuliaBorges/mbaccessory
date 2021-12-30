import styled from 'styled-components';

export const CheckboxStyle = styled.input`
	&:checked {
		filter: brightness(0) saturate(100%) invert(28%) sepia(86%)
			saturate(1369%) hue-rotate(92deg) brightness(94%) contrast(104%);
	}
`;
export const Label = styled.label``;
export const ContainerCheckbox = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;
