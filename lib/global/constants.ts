export const GRADED_COMICS_TABLE_DEFAULTS: any = {
	tableId: 'graded_comics_table',
	tableRoute: '/api/comics',
	tablePageIndex: 1,
	tablePageLen: 10,
	tableOrderBy: [
		{ 'title': 'asc' },
		{ 'issue': 'asc' },
		{ 'pub_year': 'asc' },
		{ 'pub_month': 'asc' }
	]
};

export const GRADED_COMICS_TABLE_HEADERS: {} = {
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
	// pedigree: true
};
