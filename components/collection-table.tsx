export default function CollectionTable({ tableHeaders, tableRows }) {	
	return (
		<table>
			<tbody>
				<tr>
					{
						tableHeaders && tableHeaders.map((header) => (
							<th>{ header }</th>
						))
					}
				</tr>
				
				{
					tableRows && tableRows.length > 0 && tableRows.map((row) => (
						<tr>
							{
								row && Object.keys(row).map((key) => (
									<td>{ row[key] }</td>
								))
							}
						</tr>
					))
				}
			</tbody>
		</table>
	);
}
