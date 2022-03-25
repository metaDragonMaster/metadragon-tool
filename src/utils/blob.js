export const blobType = {
	json: 'application/json'
}
function objectToJson(obj) {
	return JSON.stringify(obj, null, 2)
}

export function objectToJsonBlob(object) {
	return new Blob([objectToJson(object)],{type: blobType.json})
}
