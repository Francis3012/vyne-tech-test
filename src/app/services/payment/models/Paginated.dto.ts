export interface PaginatedDTO<T> {
	currentPage: number;
	hasNext: boolean;
	items: T[];
	numberOfPages: number;
	pageSize: number;
	totalNumberOfItems: number;
}
