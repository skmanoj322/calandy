type ResponseWrapper<T> = {
	status: string;
	message: string;
	response: {
		data: T;
	};
};
/**
 * Wraps the given data, status, and message into a standard API response format.
 *
 * @template T - The type of the data being returned.
 * @param {Object} params - The parameters to structure the response.
 * @param {T} params.data - The response payload.
 * @param {boolean} params.status - The success status of the operation.
 * @param {string} params.message - A human-readable message describing the result.
 *
 * @returns An object formatted as a consistent API response with `status`, `message`, and `response.data`.
 *
 * @example
 * const response = responseWrapper({
 *   data: { name: "Naruto" },
 *   status: true,
 *   message: "User fetched successfully"
 * });
 * console.log(response.response.data.name); // "Naruto"
 */

export const responseWrapper = <T>({
	data,
	status,
	message,
}: {
	data: T;
	status: boolean;
	message: string;
}) => {
	return {
		status,
		response: { data },
		message,
	};
};
