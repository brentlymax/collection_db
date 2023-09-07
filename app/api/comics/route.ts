import { NextResponse, type NextRequest } from 'next/server';
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
const prisma: any = new PrismaClient();

/**
 * POST call to fetch graded comics table data.
 * @param req 
 * @returns 
 */
export async function POST(req: NextRequest) {
	let postData: GradedComicsPostData = await req.json();
	let tablePageIndex = postData.pageIndex;
	let tablePageLen = postData.pageLen;
	let tableRowSkip: number = (tablePageIndex - 1) * tablePageLen;
	let tableOrderBy: {}[] = getTableOrderByOption(postData.orderBy, postData.orderDir);

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
	let res: GradedComicsTableData = {
		tableRows: resTableRows,
		tablePageIndex: tablePageIndex,
		tablePageLen: tablePageLen,
		tablePageTotal: tablePageTotal
	}

	return NextResponse.json(res);
}

/**
 * Helper func for Prisma's query that forms the orderBy option.
 * @param orderCol 
 * @param orderDir 
 * @returns 
 */
function getTableOrderByOption(orderCol: string, orderDir: string) {
	let orderBy: {}[] = [];
	let orderOption: {} = {};
	orderOption[orderCol] = orderDir;

	if (orderCol === 'title') {
		orderBy.push(
			orderOption,
			{ 'issue': orderDir }
		);
	} else if (orderCol === 'issue') {
		orderBy.push(
			orderOption,
			{ 'title': orderDir }
		);
	}
	else {
		orderBy.push(
			orderOption,
			{ 'title': orderDir },
			{ 'issue': orderDir }
		);
	}

	return orderBy;
}
