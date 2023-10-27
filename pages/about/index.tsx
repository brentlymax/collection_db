import Layout from '../../components/layout';
import style from '../../styles/about.module.css';

export default function About() {
	return (
		<Layout>
			<div className={ `flex_col flex_center w_100` }>
				<div className={ `flex_row w_100 flex_center mt_2 mb_1` }>
					<div className={ `${ style.image_wrapper } flex_col` }>
						<img
							src={ `/images/brentlymax.jpg` }
							className={ `` }
							width={ '100%' }
							alt={ `` }
						/>
					</div>
				</div>
				<div className={ `flex_row w_100` }>
					<div className={ `flex_col flex_center w_100` }>
						<div className={ `flex_row flex_center w_50` }>
							<p>
								Hey there, my name is Brently.
								I'm a software engineer by day and a collector at all times.
								This is my page dedicated to organizing my collection.
								The content here is composed of database tables for my various collectibles.
							</p>
							<p>
								
							</p>
						</div>					
					</div>
				</div>
			</div>
		</Layout>
	);
}
