import React, {useState, useEffect, useRef} from 'react';
import Layout from '../../components/layout';
import CollectionTable from '../../components/collection-table';
import { PrismaClient } from '@prisma/client';

type GradedComicsRow = {
	title: string,
	issue: number,
	grade: number,
	page_qual: string,
	grader: string,
	cert_num: string,
	publisher: string,
	pub_month: number|null,
	pub_year: number|null,
	variant: string|null,
	key_notes: string|null,
	signed_by: string|null,
};
type CollectionTableData = {
	tableId: string,
	tableRows: GradedComicsRow[],
	tablePageIndex: number,
	tablePageLen: number,
	tablePageTotal: number
};
type CollectionTablePostData = {
	tableId: string,
	orderBy: string,
	orderDir: string,
	pageIndex: number,
	pageLen: number
};

const GRADED_COMICS_HEADERS: {} = {
	title: true,
	issue: true,
	grade: true,
	page_qual: true,
	grader: true,
	cert_num: true,
	publisher: true,
	pub_month: true,
	pub_year: true,
	variant: true,
	key_notes: true,
	signed_by: true,
	// pedigree: true
};

const prisma: any = new PrismaClient();

/**
 * Comics page.
 * @param param0 
 * @returns 
 */
export default function Comics({ comicTableId, comicTableRows, comicTablePageIndex, comicTablePageLen, comicTablePageTotal }) {
	const [tableOrderCol, setTableOrderCol] = useState('title');
	const [tableOrderDir, setTableOrderDir] = useState('asc');
	const [tableRows, setTableRows] = useState(comicTableRows);
	const [tablePageIndex, setTablePageIndex] = useState(comicTablePageIndex);
	const [tablePageLen, setTablePageLen] = useState(comicTablePageLen);
	const [tablePageTotal, setTablePageTotal] = useState(comicTablePageTotal);
	const firstUpdate = useRef(true);

	async function updateTable() {
		let tableData: CollectionTableData = await fetchCollectionTableData(comicTableId, tableOrderCol, tableOrderDir, tablePageIndex, tablePageLen);
		setTablePageTotal(tableData.tablePageTotal);
		setTableRows(tableData.tableRows);
	}

	// When table page num is changed (by button click)
	useEffect(() => {	
		if (firstUpdate.current) {
			firstUpdate.current = false;
		} else {
			updateTable();
			setDivScrollTop(comicTableId);
		}
	}, [tablePageIndex]);

	// When table page len is changed (by dropdown change)
	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
		} else {
			setTablePageIndex(1);
			updateTable();
			setDivScrollTop(comicTableId);
		}
	}, [tablePageLen]);

	return (
		<Layout>
			<div className={ `flex_col flex_around w_100` }>
				<div className={ `flex_row w_100` }>
					<div className={ `flex_col w_100` }>
						<div className={ `flex_row flex_center w_100` }>
							<div className={ `flex_col flex_center w_100` }>
								<div className={ `flex_row flex_center w_100 m_1` }>
									<h3>Graded Comics</h3>
								</div>
								<div className={ `flex_row flex_center h_50` } style={ { width:'90%' } }>
									<CollectionTable
										tableId = { comicTableId }
										tableHeaders = { GRADED_COMICS_HEADERS }
										tableRows = { tableRows }
										tablePageIndex = { tablePageIndex }
										setTablePageIndex = { setTablePageIndex }
										tablePageLen = { tablePageLen }
										setTablePageLen = { setTablePageLen }
										tablePageTotal = { tablePageTotal }
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

/**
 * POST call to fetch graded comics table data.
 * @param tableOrderCol 
 * @param tableOrderDir 
 * @param tablePageIndex 
 * @param tablePageLen 
 * @returns 
 */
async function fetchCollectionTableData(tableId: string, tableOrderCol: string, tableOrderDir: string, tablePageIndex: number, tablePageLen: number) {
	let postData: CollectionTablePostData = {
		tableId: tableId,
		orderBy: tableOrderCol,
		orderDir: tableOrderDir,
		pageIndex: tablePageIndex,
		pageLen: tablePageLen
	};

	const req = await fetch(
		'/api/comics',
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

/**
 * Server side pre-rendering to fetch initial default graded comics table data.
 * @returns 
 */
export async function getServerSideProps() {
	let tableId: string = 'graded_comics_table';
	let tablePageIndex: number = 1;
	let tablePageLen: number = 10;
	let tableRowSkip: number = (tablePageIndex - 1) * tablePageLen;
	let tableOrderBy: {}[] = [
		{ 'title': 'asc' },
		{ 'issue': 'asc' }
	];

	const [resTableRows, resRowTotal] = await prisma.$transaction([
		prisma.comics_graded.findMany({
			select: GRADED_COMICS_HEADERS,
			skip: tableRowSkip,
			take: tablePageLen,
			orderBy: tableOrderBy
		}),
		prisma.comics_graded.count()
	]);

	let tablePageTotal: number = Math.ceil(resRowTotal / tablePageLen);
	let tableData: {} = {
		comicTableId: tableId,
		comicTableRows: JSON.parse(JSON.stringify(resTableRows)),
		comicTablePageIndex: tablePageIndex,
		comicTablePageLen: tablePageLen,
		comicTablePageTotal: tablePageTotal
	};

	return {
		props: tableData
	};
}

function setDivScrollTop(divId: string) {
	let tableDiv: HTMLElement|null = document.getElementById(divId);
	if (tableDiv != null) {
		tableDiv.scrollTop = 0;
	}
}
