import { CollectionTableData, CollectionTablePostBody, GradedComicsRow } from '../../../lib/global/types';
import { GRADED_COMICS_TABLE_HEADERS } from '../../../lib/global/constants';
import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma: any = new PrismaClient();

/**
 * POST call to fetch graded comics table data.
 * @param req 
 * @returns 
 */
export async function POST(req: NextRequest) {
	let postData: CollectionTablePostBody = await req.json();
	let tablePageIndex = postData.pageIndex;
	let tablePageLen = postData.pageLen;
	let tableRowSkip: number = (tablePageIndex - 1) * tablePageLen;
	let tableOrderBy: {}[] = getTableOrderByOption(postData.orderBy, postData.orderDir);

	const [resTableRows, resRowTotal]: [GradedComicsRow, number] = await prisma.$transaction([
		prisma.comics_graded.findMany({
			select: GRADED_COMICS_TABLE_HEADERS,
			skip: tableRowSkip,
			take: tablePageLen,
			orderBy: tableOrderBy
		}),
		prisma.comics_graded.count()
	]);

	let tablePageTotal: number = Math.ceil(resRowTotal / tablePageLen);
	let res: CollectionTableData = {
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

	switch(orderCol) {
		case 'title':
			orderBy.push(
				orderOption,
				{ 'issue': orderDir },
				{ 'pub_year': orderDir },
				{ 'pub_month': orderDir }
			);
			break;
		case 'issue':
			orderBy.push(
				orderOption,
				{ 'title': orderDir },
				{ 'pub_year': orderDir },
				{ 'pub_month': orderDir }
			);
			break;
		case 'pub_year':
			orderBy.push(
				orderOption,
				{ 'title': orderDir },
				{ 'issue': orderDir },
				{ 'pub_month': orderDir }
			);
			break;
		case 'pub_month':
			orderBy.push(
				orderOption,
				{ 'title': orderDir },
				{ 'issue': orderDir },
				{ 'pub_year': orderDir }
			);
			break;
		default:
			orderBy.push(
				orderOption,
				{ 'title': orderDir },
				{ 'issue': orderDir },
				{ 'pub_year': orderDir },
				{ 'pub_month': orderDir }
			);
	}

	return orderBy;
}
