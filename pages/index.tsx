import Layout from '../components/layout';

export default function Home() {
	return (
		<Layout>
			<div className={ `flex_col flex_center w_100 h_100` }>
				<div className={ `flex_row w_100` }>
					<div className={ `flex_col w_100` }>
						<div className={ `flex_row flex_center w_100 pb_1` }>
							<h3>Welcome to</h3>
						</div>
						<div className={ `flex_row flex_center w_100` }>
							<h2>Brently's Collection Database</h2>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
