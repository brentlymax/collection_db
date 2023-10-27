export const GRADED_COMICS_OPTIONS: any = {
	tableId: 'graded_comics_table',
	tableRoute: '/api/comics/graded_table',
	rowRoute: '/api/comics/graded_modal',
	tablePageIndex: 1,
	tablePageLen: 10,
	tableOrderBy: [
		{ 'title': 'asc' },
		{ 'pub_year': 'asc' },
		{ 'pub_month': 'asc' },
		{ 'issue': 'asc' }
	]
};

export const GRADED_COMICS_COLUMNS_TABLE: {} = {
	title: true,
	issue: true,
	pub_month: true,
	pub_year: true,
	publisher: true,
	grade: true,
	page_qual: true,
	grader: true,
	cert_num: true,
	variant: true,
	key_notes: false,
	signed_by: false,
	pedigree: false
};

export const GRADED_COMICS_COLUMNS_MODAL: {} = {
	title: true,
	issue: true,
	pub_month: true,
	pub_year: true,
	publisher: true,
	grade: true,
	page_qual: true,
	grader: true,
	cert_num: true,
	variant: true,
	key_notes: true,
	signed_by: true,
	pedigree: true
};
