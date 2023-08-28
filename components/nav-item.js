import {useRouter} from 'next/router';
import Link from 'next/link';

export default function NavItem({ text, href }) {
	const {asPath} = useRouter();
	let isActive = false;

	if (asPath == href) {
		isActive = true;
	}

	return (
		<Link
			href={href}
			className={`nav_item ${isActive ? 'active' : ''}`}
		>
			{text}
		</Link>
	);
}
