/**
 * Collection table component.
 * @param param0 
 * @returns 
 */
export default function CollectionTable({ tableId, tableHeaders, tableRows, tablePageIndex, setTablePageIndex, tablePageLen, setTablePageLen, tablePageTotal }) {
	let isEvenRow: boolean = false;
	let paginationBtns: React.JSX.Element[] = [];

	for (let i = 1; i <= tablePageTotal; i++) {
		paginationBtns.push(
			<div className={ `flex_col flex_between` }>
				<button
					className={ `collection_table_pagination_btns ${ (i === tablePageIndex) ? 'active' : '' }` }
					style={ { marginLeft: '0.5rem' } }
					key={ i }
					onClick={ () => setTablePageIndex(i) }
				>
					{ i }
				</button>
			</div>
		);
	}

	return (
		<div className={ `flex_col flex_center w_100 h_100` }>
			{ /* Table body */ }
			<div id={ tableId } className={ `flex_row overflow_auto w_100` } style={ { height:'70vh' } }>
				<table className={ `collection_table` }>
					<tbody className={ `collection_table_tbody` }>
						<tr className={ `collection_table_tr_head` }>
							{
								tableHeaders && Object.keys(tableHeaders).map((header) => {
									return (
										<th className={ `collection_table_th` }>{ header }</th>
									);
								})
							}
						</tr>
						{
							tableRows && tableRows.length > 0 && tableRows.map((row) => {
								let rowClass: string = '';
								
								if (isEvenRow) {
									rowClass = 'even';
								}
								else {
									rowClass = 'odd';
								}
								
								isEvenRow = !isEvenRow;
								
								return (
									<tr className={ `collection_table_tr_body ${ rowClass }` }>
										{
											row && Object.keys(row).map((key) => (
												<td className={ `collection_table_td` }>{ row[key] }</td>
											))
										}
									</tr>
								);
							})
						}
					</tbody>
				</table>
			</div>
			{ /* Table pagination */ }
			<div className={ `flex_row flex_between collection_table_pagination_row w_100` }>
				<div className={ `flex_col p_1` }>
					<div className={ `flex_row flex_between` }>
						<div className={ `flex_col flex_center mr_1` }>
							<p style={ { fontSize: '12px' } }>Page Length</p>
						</div>
						<div className={ `flex_col` }>
							<select
								value={ tablePageLen }
								onChange={
									(e) => {
										setTablePageLen(parseInt(e.target.value));
									}
								}
							>
								<option value='10'>10</option>
								<option value='25'>25</option>
								<option value='50'>50</option>
								<option value='100'>100</option>
							</select>
						</div>
					</div>

				</div>
				<div className={ `flex_col p_1` }>
					<div className={ `flex_row flex_between` }>
						<div className={ `flex_col` }>
							<div className={ `flex_row flex_center` }>
								{ paginationBtns } 
							</div>
						</div>
						<div className={ `flex_col flex_center ml_1` }>
							<p style={ { fontSize: '12px' } }>Page Number</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
