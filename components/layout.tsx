import Head from 'next/head';
import Image from 'next/image';
import NavBar from './nav-bar';

export default function Layout({children}) {
	return (
		<div className={`flex_col flex_between w_100 h_100`}>
			<Head>
				<link
					rel={`icon`}
					href={`/images/icons/treasure_chest.ico`}
				></link>
				<title>Collection DB</title>
			</Head>

			<NavBar></NavBar>

			<div className={`content`}>
				{children}
			</div>

			<footer className={`footer`}>
				<Image
					priority
					src={`/images/icons/treasure_chest.ico`}
					className={`pr_1`}
					height={25}
					width={25}
					alt={``}
				></Image>
				<h5>Powered by users like you!</h5>
			</footer>
		</div>
	);
}
