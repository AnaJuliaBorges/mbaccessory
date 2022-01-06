import { HeadRow, TableBody, TableHead, TableStyled } from './styles';

const TableList = ({ colums, children }) => {
	return (
		<TableStyled>
			<TableHead>
				<tr>
					{colums.map(column => (
						<HeadRow key={column.name} size={column.size}>{column.name}</HeadRow>
					))}
					<HeadRow />
				</tr>
			</TableHead>
			<TableBody>{children}</TableBody>
		</TableStyled>
	);
};

export default TableList;
