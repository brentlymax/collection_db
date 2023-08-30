import Layout from '../../components/layout';
// import {PrismaClient} from '@prisma/client';
// const {PrismaClient} = require('@prisma/client');

// const prisma = new PrismaClient();

// async function main() {
// 	const gradedComics = await prisma.comics_graded.findMany();
// 	console.log('comics:');
// 	console.log(gradedComics);
// }
  
// main()
// 	.then(async () => {
// 		await prisma.$disconnect()
// 	})
// 	.catch(async (e) => {
// 		console.error(e)
// 		await prisma.$disconnect()
// 		process.exit(1)
// 	});

export default function Comics() {
	return (
		<Layout>
			<div className={`flex_col flex_around w_100 h_100`}>
				<div className={`flex_row w_100`}>
					<div className={`flex_col w_100`}>
						<div className={`flex_row flex_center w_100`}>
							<p>Comics content placeholder</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
