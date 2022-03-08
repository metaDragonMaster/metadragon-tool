import fleekStorage from '@fleekhq/fleek-storage-js'
import { hex_md5 } from "@/utils/md5"

export const options = {
	apiKey: `+uwU5iLeP1tp0Xe+qiIY9g==`,
	apiSecret: `UARFO6RVgMDHOsHuKm2uJWQ7SLkCmKXhROkhIuKWHa4=`
}

export async function uploadByIpfs(fileData, ProgressFn) {
	// fileData, fileName,
	const fileName = fileData.raw ? fileData.raw.name : fileData.name;
	const fileType = fileData.raw ? fileData.raw.type : fileData.type;
	const md5Name = hex_md5(fileName);
	const fileKey = `${new Date().getTime().toString()}-${md5Name}-${fileName}`
	console.log(fileName, fileType,
		md5Name,
		fileKey
		);
	const uploadedFile = await fleekStorage.upload({
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
export async function deleteFileByIpfs(fileKey,bucket) {
	const res = await fleekStorage.deleteFile({
		apiKey: options.apiKey,
		apiSecret: options.apiSecret,
		key: fileKey,
		bucket
	})
	return res;
}
