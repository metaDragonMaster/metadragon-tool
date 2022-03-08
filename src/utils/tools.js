import { ElMessage } from "element-plus"

export const getScroll = () => document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
export const getClientWidth = () => document.documentElement.clientWidth;
export const getWindowHeight = () => window.outerHeight;//获取整个浏览器的高度
export const getWindowInnerHeight = () => window.innerHeight;//获取整个浏览器的高度
export const getWindowToolHeight = () => window.outerHeight - window.innerHeight;//获取浏览器工具栏的高度
export const startLanguage = () => localStorage.getItem('language') || (navigator.language ? navigator.language : navigator.userLanguage).toLowerCase().split("-")[0] || "zh";

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
	if (!source && typeof source !== 'object') {
		throw new Error('error arguments', 'deepClone')
	}
	const targetObj = source.constructor === Array ? [] : {}
	Object.keys(source).forEach(keys => {
		if (source[keys] && typeof source[keys] === 'object') {
			targetObj[keys] = deepClone(source[keys])
		} else {
			targetObj[keys] = source[keys]
		}
	})
	return targetObj
}
/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
	const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
	if (!search) {
		return {}
	}
	const obj = {}
	const searchArr = search.split('&')
	searchArr.forEach(v => {
		const index = v.indexOf('=')
		if (index !== -1) {
			const name = v.substring(0, index)
			const val = v.substring(index + 1, v.length)
			obj[name] = val
		}
	})
	return obj
}
export const countStatistics = (n) => {
	//统计字数
	/*	@统计规则：
			中文 	+1
			图片标签 +1
			英文		+1/2
	*/
	let temp = n.replace(/<\/?.+?>/g, '');
	let result = temp.replace(/ /g, ''); //result为获取冲文字得到后的内容，去除空格
	let zh = temp.replace(/[a-zA-Z]+/g, ''); //去除英文
	let imageLabel = n.match(/<img[^>]+>/g); //图片标签：type:Array
	let imageLength;
	if (imageLabel) {
		imageLength = imageLabel.length;
	}
	if (!imageLabel) {
		imageLength = 0;
	}
	return imageLength + zh.length + (result.length - zh.length) / 2;
	// console.log("格式化之后的内容：",this.spanInfo)
}

export const debounce = (fn, delay = 300) => {
	let timer = null;
	return function () {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, arguments);
			timer = null;
		}, delay);
	};
}
export const throttle = (fn, delay = 1000) => {
	var timer = null;
	return function () {
		if (timer) return;
		timer = setTimeout(() => {
			fn.apply(this, arguments);
			timer = null;
		}, delay);
	};
}

export const assign = function (objs) {
	return Object.assign(...objs)
}
export const getItemByKey = function (value, list, key) {
	return list.filter(item => value == item[key])[0];
}
export const getObjectKeyAndValue = function (object,
	keyName = 'key',
	valueName = 'value'
) {
	let obj = [];
	for (let i in object) {
		console.log(object[i], i);
		obj.push({
			[keyName]: i,
			[valueName]: object[i]
		})
	}
	return obj
}

//计算重复单词,返回重复数量
export const CalculateRepeatedWords = function (str) {
	let repeateds = [];
	const strs = str.split(' ')
	strs.map(item => {
		if (!repeateds.includes(item)) repeateds.push(item)
	})
	return repeateds.length;
}

export const ArrayKeysToObject = function (Arr, Interface) {
	let _project = {};
	let i;
	for (i in Arr) {
		if (Interface.includes(i)) {
			_project[i] = Arr[i]
		}
	}
	return _project
}

export const copy = function (text) {
	// console.log('copyText');
	const textareaEl = document.createElement('textarea');
	textareaEl.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
	textareaEl.style.position = 'absolute';
	textareaEl.style.left = '-100vw';
	textareaEl.value = text;
	document.body.appendChild(textareaEl);
	textareaEl.select();
	const success = document.execCommand('copy');
	document.body.removeChild(textareaEl);
	// if (fn) fn(success);
	if (success) {
		ElMessage({
			type: 'success',
			message: 'copy success',
			grouping: true,
			showClose: true,
		})
	}
	return success;
}
export const downloadFile = function (file) {
	var a = document.createElement('a');
	//需要下载的数据内容,我这里放的就是BLOB，如果你有下载链接就不需要了
	var url = window.URL.createObjectURL(file);
	a.href = url;
	a.download = file.name;
	a.click();
	window.URL.revokeObjectURL(url);
}

export const fileToUrl = function(file) {
	var url = window.URL.createObjectURL(file);
	window.URL.revokeObjectURL(url);
	return url;
}
