/**
 * Custom response interface for handling data and queries.
 */
export interface MyResponse<T> {
    data: T[];
    queries: string[];
}