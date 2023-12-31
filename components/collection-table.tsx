import { GradedComicsRow, CollectionTableData, CollectionTablePostBody, CollectionModalData, CollectionModalPostBody } from '../lib/global/types';
import React, {useState, useEffect, useRef} from 'react';
import TablePagination from '../components/table-pagination';
import CollectionModal from '../components/collection-modal';

/**
 * Collection table component.
 * @param param0 
 * @returns 
 */
export default function CollectionTable({ tableId, tableHeaders, tableRoute, rowRoute, initTableData }) {
	const [tableOrderCol, setTableOrderCol]: [string, Function] = useState('title');
	const [tableOrderDir, setTableOrderDir]: [string, Function] = useState('asc');
	const [tableRows, setTableRows]: [any, Function] = useState(initTableData.tableRows);
	const [tablePageIndex, setTablePageIndex]: [number, Function] = useState(initTableData.tablePageIndex);
	const [tablePageLen, setTablePageLen]: [number, Function] = useState(initTableData.tablePageLen);
	const [tablePageTotal, setTablePageTotal]: [number, Function] = useState(initTableData.tablePageTotal);
	const [collectionModalIsOpen, setCollectionModalIsOpen] = useState(false);
	const [collectionModalContent, setCollectionModalContent] = useState({});
	let isEvenRow: boolean = false;

	async function openCollectionModal(data: {}) {
		let row: CollectionModalData = await fetchCollectionModalData(rowRoute, data['grader'], data['cert_num']);
		setCollectionModalContent(row.rowData);
		setCollectionModalIsOpen(true);
	}
	
	// Helper func that fetches updated table data and updates matching hooks.
	async function updateCollectionTable() {
		let tableData: CollectionTableData = await fetchCollectionTableData(tableRoute, tableOrderCol, tableOrderDir, tablePageIndex, tablePageLen);
		setTableRows(tableData.tableRows);
		setTablePageTotal(tableData.tablePageTotal);
	}

	// When table page num hook is changed (by button click).
	const firstUpdatePageNum: React.MutableRefObject<boolean> = useRef(true);
	useEffect(() => {	
		if (firstUpdatePageNum.current) {
			firstUpdatePageNum.current = false;
		} else {
			updateCollectionTable();
			setDivScrollTop(tableId);
		}
	}, [tablePageIndex]);

	// When table page len hook is changed (by dropdown change).
	const firstUpdatePageLen: React.MutableRefObject<boolean> = useRef(true);
	useEffect(() => {
		if (firstUpdatePageLen.current) {
			firstUpdatePageLen.current = false;
		} else if (tablePageIndex != 1) {
			setTablePageIndex(1);
		} else {
			updateCollectionTable();
			setDivScrollTop(tableId);
		}
	}, [tablePageLen]);

	return (
		<div className={ `flex_col flex_center w_100 h_100` }>
			<CollectionModal
				collectionModalIsOpen={ collectionModalIsOpen }
				setCollectionModalIsOpen={ setCollectionModalIsOpen }
				collectionModalContent={ collectionModalContent }
			></CollectionModal>

			{ /* Table content */ }
			<div id={ tableId } className={ `flex_row overflow_auto w_100` } style={ { height:'70vh' } }>
				<table className={ `collection_table` }>
					<tbody className={ `collection_table_tbody` }>
						<tr className={ `collection_table_tr_head` }>
							{
								tableHeaders && Object.keys(tableHeaders).map((header) => {
									let formattedHeader = formatTableHeader(header);
									if (tableHeaders[header]) {
										return (
											<th className={ `collection_table_th` }>
												<div className={ `flex_start no_wrap` }>
													{ formattedHeader }
												</div>
											</th>
										);	
									}
								})
							}
						</tr>
						{
							tableRows && tableRows.length > 0 && tableRows.map((row) => {
								let rowClass: string = '';
								if (isEvenRow) {
									rowClass = 'even';
								} else {
									rowClass = 'odd';
								}
								isEvenRow = !isEvenRow;
								
								return (
									<tr
										className={ `collection_table_tr_body ${ rowClass }` }
										onClick={ () => openCollectionModal(row) }
									>
										{
											row && Object.keys(row).map((key) => (
												<td
													className={ `collection_table_td` }
												>
													{ row[key] }
												</td>
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
			<TablePagination
				tablePageIndex={ tablePageIndex }
				setTablePageIndex={ setTablePageIndex }
				tablePageLen={ tablePageLen }
				setTablePageLen={ setTablePageLen }
				tablePageTotal={ tablePageTotal }
			/>
		</div>
	);
}

/**
 * POST call to fetch collection table data.
 * @param tableRoute 
 * @param tableOrderCol 
 * @param tableOrderDir 
 * @param tablePageIndex 
 * @param tablePageLen 
 * @returns 
 */
async function fetchCollectionTableData(tableRoute: string, tableOrderCol: string, tableOrderDir: string, tablePageIndex: number, tablePageLen: number) {
	let postData: CollectionTablePostBody = {
		orderBy: tableOrderCol,
		orderDir: tableOrderDir,
		pageIndex: tablePageIndex,
		pageLen: tablePageLen
	};

	const req = await fetch(
		tableRoute,
		{
			method: 'POST',
			headers:  {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		}
	);
	const res: CollectionTableData = await req.json();

	return res;
}

async function fetchCollectionModalData(tableRoute: string, rowGrader: string, rowCertNum: string) {
	let postData: CollectionModalPostBody = {
		grader: rowGrader,
		certNum: rowCertNum
	};

	const req = await fetch(
		tableRoute,
		{
			method: 'POST',
			headers:  {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		}
	);
	const res: CollectionModalData = await req.json();

	return res;
}

/**
 * Resets x-axis scroll to top for the div matching the passed id.
 * @param divId 
 */
function setDivScrollTop(divId: string) {
	let div: HTMLElement|null = document.getElementById(divId);
	if (div != null) {
		div.scrollTop = 0;
	}
}

function formatTableHeader(header) {
	let formattedHeader = header.toUpperCase();
	formattedHeader = formattedHeader.replace('_', ' ');
	return formattedHeader;
}
