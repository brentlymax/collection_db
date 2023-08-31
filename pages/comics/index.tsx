import Layout from '../../components/layout';
import CollectionTable from '../../components/collection-table';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export default function Comics({ comicTableHeaders, comicTableClasses, comicTableRows }) {
	return (
		<Layout>
			<div className={ `flex_col flex_around w_100` }>
				<div className={ `flex_row w_100` }>
					<div className={ `flex_col w_100` }>
						<div className={ `flex_row flex_center w_100` }>
							<div className={ `flex_col flex_center w_100` }>
								<div className={ `flex_row flex_center w_100 m_2` }>
									<h3>Graded Comics</h3>
								</div>
								<div className={ `flex_row flex_center w_75 h_50` }>
									<CollectionTable
										tableHeaders = { comicTableHeaders }
										tableClasses = { comicTableClasses }
										tableRows = { comicTableRows }
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

// Server side pre-rendering.
export async function getStaticProps() {
	const GRADED_COMICS_HEADERS = {
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
	
	const GRADED_COMICS_CLASSES = {
		table: 'graded_comics_table',
		tbody: 'graded_comics_tbody',
		trHeader: 'graded_comics_tr_header',
		th: 'graded_comics_th',
		trBody: 'graded_comics_tr_data',
		td: 'graded_comics_td'
	};

	const prisma = new PrismaClient();
	const response = await prisma.comics_graded.findMany({
		select: GRADED_COMICS_HEADERS,
		orderBy: [
			{
				title: 'asc'
			},
			{
				issue: 'asc'
			}
		]
	});
	return {
		props: {
			comicTableHeaders: GRADED_COMICS_HEADERS,
			comicTableClasses: GRADED_COMICS_CLASSES,
			comicTableRows: JSON.parse(JSON.stringify(response))
		}
	};
}

// Client side fetching, get request.
function fetchGradedComicsGet() {
	async function request() {
		const response = await fetch(
			'/api/comics',
			{
				method: 'GET'
			}
		);

		return response.json();
	}

	request().then((response) => {
		console.log(response);
	})
}

// Client side fetching, post request.
function fetchGradedComicsPost() {
	async function request() {
		let postData = {
			orderBy: 'the_column',
			orderDir: 'asc'
		};
		const response = await fetch(
			'/api/comics',
			{
				method: 'POST',
				headers:  {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(postData)
			}
		);

		return response.json();
	}

	request().then((response) => {
		console.log(response);
	})
}
