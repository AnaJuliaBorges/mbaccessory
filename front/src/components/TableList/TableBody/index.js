import { FaTimesCircle } from 'react-icons/fa';
import { BodyRow, TableBodyStyled, DeleteCol } from './styles';

const TableBody = ({ row, columns, deleteFunction }) => {
	return (
		<tr>
			{columns.map(col => (
				<BodyRow size={col.size}>
					{typeof row[col.campoAPI] === 'boolean'
						? row[col.campoAPI]
							? 'Sim'
							: 'Não'
						: row[col.campoAPI]}
				</BodyRow>
			))}
			<DeleteCol>
				<FaTimesCircle onClick={() => deleteFunction(row._id)} />
			</DeleteCol>
		</tr>
	);
};

export default TableBody;
