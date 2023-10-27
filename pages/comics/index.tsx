import { CollectionTableData } from '../../lib/global/types';
import { GRADED_COMICS_OPTIONS, GRADED_COMICS_COLUMNS_TABLE } from '../../lib/global/constants';
import Layout from '../../components/layout';
import CollectionTable from '../../components/collection-table';
import { PrismaClient } from '@prisma/client';

const prisma: any = new PrismaClient();

/**
 * Comics page.
 * @param param0 
 * @returns 
 */
export default function Comics({ initTableData }) {
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
								<div className={ `flex_row flex_center h_50` } style={ { width:'98%' } }>
									<CollectionTable
										tableId={ GRADED_COMICS_OPTIONS.tableId }
										tableHeaders={ GRADED_COMICS_COLUMNS_TABLE }
										tableRoute={ GRADED_COMICS_OPTIONS.tableRoute }
										rowRoute={ GRADED_COMICS_OPTIONS.rowRoute }
										initTableData={ initTableData }
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
 * Server side pre-rendering to fetch initial default graded comics table data.
 * @returns 
 */
export async function getServerSideProps() {
	let tableRowSkip: number = (GRADED_COMICS_OPTIONS.tablePageIndex - 1) * GRADED_COMICS_OPTIONS.tablePageLen;

	const [resTableRows, resRowTotal] = await prisma.$transaction([
		prisma.comics_graded.findMany({
			select: GRADED_COMICS_COLUMNS_TABLE,
			skip: tableRowSkip,
			take: GRADED_COMICS_OPTIONS.tablePageLen,
			orderBy: GRADED_COMICS_OPTIONS.tableOrderBy
		}),
		prisma.comics_graded.count()
	]);

	let tablePageTotal: number = Math.ceil(resRowTotal / GRADED_COMICS_OPTIONS.tablePageLen);
	let gradedComicsTableData: CollectionTableData = {
		tableRows: JSON.parse(JSON.stringify(resTableRows)),
		tablePageIndex: GRADED_COMICS_OPTIONS.tablePageIndex,
		tablePageLen: GRADED_COMICS_OPTIONS.tablePageLen,
		tablePageTotal: tablePageTotal
	};

	return {
		props: {
			initTableData: gradedComicsTableData
		}
	};
}
