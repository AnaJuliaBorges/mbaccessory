import ReactLoading from 'react-loading';
import { defaultTheme } from '../../globalStyle';

const { colors } = defaultTheme;

const Loading = ({ type = 'spin' }) => (
	<ReactLoading type={type} color={colors.primary} height={40} width={40} />
);

export default Loading;
