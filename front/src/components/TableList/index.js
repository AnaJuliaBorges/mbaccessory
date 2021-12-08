import { FaColumns, FaTimesCircle } from 'react-icons/fa';
import { HeadRow, TableBody, TableHead, TableStyled } from './styles';

const TableList = ({ colums, children }) => {
	console.log(colums);
	return (
		<TableStyled>
			<TableHead>
				<tr>
					{colums.map((column) => (
						<HeadRow size={column.size}>{column.name}</HeadRow>
					))}
					<HeadRow />
				</tr>
			</TableHead>
			<TableBody>{children}</TableBody>
		</TableStyled>
	);
};

export default TableList;
