export type CollectionTableData = {
	tableRows: any,
	tablePageIndex: number,
	tablePageLen: number,
	tablePageTotal: number
};

export type CollectionTablePostBody = {
	orderBy: string,
	orderDir: string,
	pageIndex: number,
	pageLen: number
};

export type GradedComicsRow = {
	title: string,
	issue: number,
	grade: number,
	page_qual: string,
	grader: string,
	cert_num: string,
	publisher: string,
	pub_month: number|null,
	pub_year: number|null,
	variant: string|null,
	key_notes: string|null,
	signed_by: string|null,
};
