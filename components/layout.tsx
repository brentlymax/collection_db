import Head from 'next/head';
import NavBar from './nav-bar';

export default function Layout({ children }) {
	return (
		<div className={ `flex_col flex_between w_100 h_100` }>
			<Head>
				<link
					rel={ `icon` }
					href={ `/images/icons/treasure_chest.ico` }
				></link>
				<title>Collection DB</title>
			</Head>

			<NavBar></NavBar>

			<div className={ `content` }>
				{ children }
			</div>

			<footer className={ `footer` }>
				<img
					src={ `/images/icons/treasure_chest.ico` }
					className={ `pr_1` }
					height={ 20 }
					width={ 20 }
					alt={ `` }
				/>
				<h5>Powered by users like you!</h5>
			</footer>
		</div>
	);
}
