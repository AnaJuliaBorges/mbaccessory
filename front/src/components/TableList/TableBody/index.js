import { FaTimesCircle, FaBan } from 'react-icons/fa';
import { BodyRow, DeleteCol, ZeroCol } from './styles';
import {formatPrice} from '../../../utils/functions'

const TableBody = ({ row, columns, deleteFunction, zeroFunction }) => {
	return (
		<tr>
			{columns.map(col => (
				<BodyRow key={col.name} size={col.size}>
					{typeof row[col.campoAPI] === 'boolean'
						? row[col.campoAPI]
							? 'Sim'
							: 'Não'
						: col.type === 'price' ? formatPrice(row[col.campoAPI]) : row[col.campoAPI] || '--'}
				</BodyRow>
			))}
			<DeleteCol>
				<FaTimesCircle onClick={() => deleteFunction(row._id)} />
			</DeleteCol>
			{
				zeroFunction && 
					<ZeroCol>
						<FaBan onClick={() => zeroFunction(row._id)} />
					</ZeroCol>
			}

		</tr>
	);
};

export default TableBody;
