// import fleekStorage from '@fleekhq/fleek-storage-js'
import { upload, deleteFile } from '@fleekhq/fleek-storage-js'
import { hex_md5 } from "@/utils/md5"

export const options = {
	apiKey: `+uwU5iLeP1tp0Xe+qiIY9g==`,
	apiSecret: `UARFO6RVgMDHOsHuKm2uJWQ7SLkCmKXhROkhIuKWHa4=`
}
export function randomName(fileName,fileType) {
	const md5Name = hex_md5(fileName);
	const name = `${new Date().getTime().toString()}-${md5Name}-${fileName}`
	const fileKey = fileType? `${name}.${fileType}` : name
	return  fileKey
}
export async function uploadImageByIpfs(fileData, ProgressFn) {
	// fileData, fileName,
	const fileName = fileData.raw ? fileData.raw.name : fileData.name;
	const fileType = fileData.raw ? fileData.raw.type : fileData.type;
	const fileKey = randomName(fileName)
	// console.log(
	// 	fileName,
	// 	fileType,
	// 	md5Name,
	// 	fileKey
	// );
	const uploadedFile = await upload({
		apiKey: options.apiKey,
		apiSecret: options.apiSecret,
		key: fileKey,
		ContentType: fileType,
		data: fileData,
		httpUploadProgressCallback: (event) => {
			let Progress = Math.round(event.loaded / event.total * 100)
			console.log(`httpUploadProgressCallback-fn-:${Progress}% done`);
			ProgressFn && ProgressFn(event)
		}
	});
	console.log("uploadByIpfs", uploadedFile)
	return uploadedFile
	// return false
}
export async function uploadFile(fileData, fileType, fileKey, ProgressFn) {
	const uploadedFile = await upload({
		apiKey: options.apiKey,
		apiSecret: options.apiSecret,
		key: fileKey,
		ContentType: fileType,
		data: fileData,
		httpUploadProgressCallback: (event) => {
			let Progress = Math.round(event.loaded / event.total * 100);
			console.log(`httpUploadProgressCallback-fn-:${Progress}% done`);
			ProgressFn && ProgressFn(event, Progress);
		}
	});
	return uploadedFile
}

export async function deleteFileByIpfs(fileKey, bucket) {
	const res = await deleteFile({
		apiKey: options.apiKey,
		apiSecret: options.apiSecret,
		key: fileKey,
		bucket
	})
	return res;
}
