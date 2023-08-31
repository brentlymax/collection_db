import Layout from '../../components/layout';
import CollectionTable from '../../components/collection-table';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const GRADED_COMICS_HEADERS = [
	'title',
	'issue',
	'grade',
	'grader',
	'cert_num',
	'publisher',
	'month',
	'year',
	'variant',
	'key_notes',
	'signed_by',
	'pedigree'
];

export default function Comics({ comicTableHeaders, comicTableRows }) {
	return (
		<Layout>
			<div className={ `flex_col flex_around w_100` }>
				<div className={ `flex_row w_100` }>
					<div className={ `flex_col w_100` }>
						<div className={ `flex_row flex_center w_100` }>
							<div className={ `flex_col flex_center w_100` }>
								<div className={ `flex_row flex_center w_100` }>
									<p>Comics content placeholder</p>
								</div>
								<div className={ `flex_row flex_center w_100` }>
									<button onClick={ fetchGradedComicsGet }>Test GET</button>
								</div>
								<div className={ `flex_row flex_center w_100` }>
									<button onClick={ fetchGradedComicsPost }>Test POST</button>
								</div>
								<div className={ `flex_row flex_center w_100` }>
									<CollectionTable
										tableHeaders = { comicTableHeaders }
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

// Server side pre-rendering.
export async function getStaticProps() {
	const prisma = new PrismaClient();
	const response = await prisma.comics_graded.findMany({
		orderBy: [
			{
				title: 'asc'
			},
			{
				issue: 'asc'
			}
		]
	});
	return { props: { comicTableHeaders: GRADED_COMICS_HEADERS, comicTableRows: JSON.parse(JSON.stringify(response)) } };
}
