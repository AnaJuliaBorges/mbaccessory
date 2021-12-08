import ReactLoading from 'react-loading';
import { defaulTheme } from '../../globalStyle';

const { colors } = defaulTheme;

const Loading = ({ type = 'spin' }) => (
	<ReactLoading type={type} color={colors.primary} height={40} width={40} />
);

export default Loading;
