import style from '../styles/collection-table.module.css';

export default function CollectionTable({ tableHeaders, tableClasses, tableRows }) {	
	let isEvenRow = false;
	
	return (
		<table className={ tableClasses.table }>
			<tbody className={ tableClasses.tbody }>
				<tr className={ tableClasses.trHeader }>
					{
						tableHeaders && Object.keys(tableHeaders).map((header) => {
							return (
								<th className={ tableClasses.th }>{ header }</th>
							);
						})
					}
				</tr>
				
				{
					tableRows && tableRows.length > 0 && tableRows.map((row) => {
						let rowClass = '';
						if (isEvenRow) {
							rowClass = 'even';
						}
						else {
							rowClass = 'odd';
						}
						isEvenRow = !isEvenRow;
						
						return (
							<tr className={ `${ tableClasses.trBody } ${ rowClass }` }>
								{
									row && Object.keys(row).map((key) => (
										<td className={ tableClasses.td }>{ row[key] }</td>
									))
								}
							</tr>
						);
					})
					
				}
			</tbody>
		</table>
	);
}
