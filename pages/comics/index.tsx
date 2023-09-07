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
type GradedComicsTableData = {
	tableRows: GradedComicsRow[],
	tablePageIndex: number,
	tablePageLen: number,
	tablePageTotal: number
};
type GradedComicsPostData = {
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
const GRADED_COMICS_CLASSES: {} = {
	table: 'graded_comics_table',
	tbody: 'graded_comics_tbody',
	th: 'graded_comics_th',
	trHead: 'graded_comics_tr_head',
	trBody: 'graded_comics_tr_body',
	td: 'graded_comics_td'
};
const prisma: any = new PrismaClient();

/**
 * Comics page.
 * @param param0 
 * @returns 
 */
export default function Comics({ comicTableRows, comicTablePageIndex, comicTablePageLen, comicTablePageTotal }) {
	const [tableOrderCol, setTableOrderCol] = useState('title');
	const [tableOrderDir, setTableOrderDir] = useState('asc');
	const [tableRows, setTableRows] = useState(comicTableRows);
	const [tablePageIndex, setTablePageIndex] = useState(comicTablePageIndex);
	const [tablePageLen, setTablePageLen] = useState(comicTablePageLen);
	const [tablePageTotal, setTablePageTotal] = useState(comicTablePageTotal);
	const firstUpdate = useRef(true);

	async function updateTable() {
		let tableData: GradedComicsTableData = await fetchGradedComicsPost(tableOrderCol, tableOrderDir, tablePageIndex, tablePageLen);
		setTablePageTotal(tableData.tablePageTotal);
		setTableRows(tableData.tableRows);
	}

	useEffect(() => {	
		if (firstUpdate.current) {
			firstUpdate.current = false;
		} else {
			updateTable();
		}
	}, [tablePageIndex]);

	useEffect(() => {
		setTablePageIndex(1);

		if (firstUpdate.current) {
			firstUpdate.current = false;
		} else {
			updateTable();
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
										tableHeaders = { GRADED_COMICS_HEADERS }
										tableClasses = { GRADED_COMICS_CLASSES }
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
async function fetchGradedComicsPost(tableOrderCol: string, tableOrderDir: string, tablePageIndex: number, tablePageLen: number) {
	let postData: GradedComicsPostData = {
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
	const res: GradedComicsTableData = await req.json();

	return res;
}

/**
 * Server side pre-rendering to fetch initial default graded comics table data.
 * @returns 
 */
export async function getServerSideProps() {
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

	return {
		props: {
			comicTableRows: JSON.parse(JSON.stringify(resTableRows)),
			comicTablePageIndex: tablePageIndex,
			comicTablePageLen: tablePageLen,
			comicTablePageTotal: tablePageTotal
		}
	};
}
