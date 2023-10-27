import { GradedComicsRow, CollectionModalData, CollectionModalPostBody } from '../../../../lib/global/types';
import { GRADED_COMICS_COLUMNS_MODAL } from '../../../../lib/global/constants';
import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma: any = new PrismaClient();

/**
 * POST call to fetch data for a single graded comic row.
 * @param req 
 * @returns 
 */
export async function POST(req: NextRequest) {
	let postData: CollectionModalPostBody = await req.json();

	const resRow: GradedComicsRow = await prisma.$transaction([
		prisma.comics_graded.findUnique({
			select: GRADED_COMICS_COLUMNS_MODAL,
			where: {
				grader: postData.grader,
				cert_num: postData.certNum
			}
		})
	]);

	let res: CollectionModalData = {
		rowData: resRow[0],
		rowImages: []
	}

	return NextResponse.json(res);
}
