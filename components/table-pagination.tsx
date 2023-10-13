import React, {useState, useEffect, useRef} from 'react';

/**
 * Table pagination component
 * @param param0 
 * @returns 
 */
export default function TablePagination({ tablePageIndex, setTablePageIndex, tablePageLen, setTablePageLen, tablePageTotal }) {
	// Build pagination buttons HTML.
	let paginationBtns: React.JSX.Element[] = [];

	// Left arrow.
	paginationBtns.push(
		<div className={ `flex_col flex_between` }>
			<button
				className={ `collection_table_pagination_arrows ${ (tablePageIndex !== 1) ? 'enabled' : '' }` }
				style={ { marginLeft: '0.5rem' } }
				onClick={ () => setTablePageIndex(tablePageIndex - 1) }
			>
				{ '<' }
			</button>
		</div>
	);

	// Page buttons
	if (tablePageTotal <= 6) {
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
	}
	else {
		paginationBtns.push(
			<div className={ `flex_col flex_between` }>
				<button
					className={ `collection_table_pagination_btns ${ (1 === tablePageIndex) ? 'active' : '' }` }
					style={ { marginLeft: '0.5rem' } }
					key={ 1 }
					onClick={ () => setTablePageIndex(1) }
				>
					{ 1 }
				</button>
			</div>
		);
		paginationBtns.push(
			<div className={ `flex_col flex_between` }>
				<button
					className={ `collection_table_pagination_btns ${ (2 === tablePageIndex) ? 'active' : '' }` }
					style={ { marginLeft: '0.5rem' } }
					key={ 2 }
					onClick={ () => setTablePageIndex(2) }
				>
					{ 2 }
				</button>
			</div>
		);

		if (tablePageIndex === 1 || tablePageIndex === 2 || tablePageIndex === tablePageTotal - 1 || tablePageIndex === tablePageTotal) {
			paginationBtns.push(
				<div style={ { marginLeft: '0.5rem' } }>...</div>
			);
			paginationBtns.push(
				<div className={ `flex_col flex_between` }>
					<button
						className={ `collection_table_pagination_btns` }
						style={ { marginLeft: '0.5rem' } }
						key={ Math.floor(tablePageTotal / 2) }
						onClick={ () => setTablePageIndex(Math.floor(tablePageTotal / 2)) }
					>
						{ Math.floor(tablePageTotal / 2) }
					</button>
				</div>
			);
			paginationBtns.push(
				<div style={ { marginLeft: '0.5rem' } }>...</div>
			);
		}
		else {
			paginationBtns.push(
				<div style={ { marginLeft: '0.5rem' } }>...</div>
			);
			paginationBtns.push(
				<div className={ `flex_col flex_between` }>
					<button
						className={ `collection_table_pagination_btns active` }
						style={ { marginLeft: '0.5rem' } }
						key={ tablePageIndex }
						onClick={ () => setTablePageIndex(tablePageIndex) }
					>
						{ tablePageIndex }
					</button>
				</div>
			);
			paginationBtns.push(
				<div style={ { marginLeft: '0.5rem' } }>...</div>
			);
		}

		paginationBtns.push(
			<div className={ `flex_col flex_between` }>
				<button
					className={ `collection_table_pagination_btns ${ (tablePageTotal - 1 === tablePageIndex) ? 'active' : '' }` }
					style={ { marginLeft: '0.5rem' } }
					key={ 1 }
					onClick={ () => setTablePageIndex(tablePageTotal - 1) }
				>
					{ tablePageTotal - 1 }
				</button>
			</div>
		);
		paginationBtns.push(
			<div className={ `flex_col flex_between` }>
				<button
					className={ `collection_table_pagination_btns ${ (tablePageTotal === tablePageIndex) ? 'active' : '' }` }
					style={ { marginLeft: '0.5rem' } }
					key={ 1 }
					onClick={ () => setTablePageIndex(tablePageTotal) }
				>
					{ tablePageTotal }
				</button>
			</div>
		);
	}


	// Right arrow.
	paginationBtns.push(
		<div className={ `flex_col flex_between` }>
			<button
				className={ `collection_table_pagination_arrows ${ (tablePageIndex !== tablePageTotal) ? 'enabled' : '' }` }
				style={ { marginLeft: '0.5rem' } }
				onClick={ () => setTablePageIndex(tablePageIndex + 1) }
			>
				{ '>' }
			</button>
		</div>
	);

	return (
		<div className={ `flex_row flex_between collection_table_pagination_row w_100` }>
			<div className={ `flex_col p_1` }>
				<div className={ `flex_row flex_between` }>
					<div className={ `pagination_text flex_col flex_center mr_1` }>
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
					<div className={ `pagination_text flex_col flex_center ml_1` }>
						<p style={ { fontSize: '12px' } }>Page Number</p>
					</div>
				</div>
			</div>
		</div>
	);
}
