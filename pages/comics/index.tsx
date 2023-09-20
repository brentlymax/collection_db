import { CollectionTableData } from '../../lib/global/types';
import { GRADED_COMICS_TABLE_DEFAULTS, GRADED_COMICS_TABLE_HEADERS } from '../../lib/global/constants';
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
								<div className={ `flex_row flex_center h_50` } style={ { width:'90%' } }>
									<CollectionTable
										tableId={ GRADED_COMICS_TABLE_DEFAULTS.tableId }
										tableHeaders={ GRADED_COMICS_TABLE_HEADERS }
										tableRoute={ GRADED_COMICS_TABLE_DEFAULTS.tableRoute }
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
	let tableRowSkip: number = (GRADED_COMICS_TABLE_DEFAULTS.tablePageIndex - 1) * GRADED_COMICS_TABLE_DEFAULTS.tablePageLen;

	const [resTableRows, resRowTotal] = await prisma.$transaction([
		prisma.comics_graded.findMany({
			select: GRADED_COMICS_TABLE_HEADERS,
			skip: tableRowSkip,
			take: GRADED_COMICS_TABLE_DEFAULTS.tablePageLen,
			orderBy: GRADED_COMICS_TABLE_DEFAULTS.tableOrderBy
		}),
		prisma.comics_graded.count()
	]);

	let tablePageTotal: number = Math.ceil(resRowTotal / GRADED_COMICS_TABLE_DEFAULTS.tablePageLen);
	let gradedComicsTableData: CollectionTableData = {
		tableRows: JSON.parse(JSON.stringify(resTableRows)),
		tablePageIndex: GRADED_COMICS_TABLE_DEFAULTS.tablePageIndex,
		tablePageLen: GRADED_COMICS_TABLE_DEFAULTS.tablePageLen,
		tablePageTotal: tablePageTotal
	};

	return {
		props: {
			initTableData: gradedComicsTableData
		}
	};
}
