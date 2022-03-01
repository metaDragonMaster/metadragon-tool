// import moment from 'moment';

//过滤文本，value应该是从0开始的number，arr是需要被过滤的文本数组，
//用于循环
export const valueFilter = function(value, arr) {
	for (let i in arr) {
		if (i == value) {
			return arr[value];
		}
	}
}
//展示判断 用于多个占用面积大的页面模块
export const showToIndex = (index, str = '', un = false) => { //判断字符串中是否有这个值
	//判断是否需要展示 场景，index = 0 ，str='012',在需要展示的index 中加上他。
	if (typeof(str) != 'string') { //类型判断，其实还是ts好一些
		str = JSON.stringify(str);
	}
	if (str.length <= 0) { //判断是否为空
		return false;
	}
	if (un == true) {
		return str.indexOf(index) == -1;
	}
	return str.indexOf(index) != -1;
}
//类型判断
export const dataToString = (data) => {
	return Object.prototype.toString.call(data);
}
export const utilTypeOf = {
	notNull: (data) => {
		return dataToString(data) != '[object Null]' && dataToString(data) != '[object Undefined]';
	},
	isArray: (arr) => {
		return dataToString(arr) == '[object Array]' && arr.length > 0;
	},
	isString: (str) => {
		return dataToString(str) == '[object String]' && str.length > 0;
	},
	isObject: (obj) => {
		return dataToString(obj) == '[object Object]';
	},
	isNumber: (num) => {
		return dataToString(num) == '[object Number]';
	},
	isFunction: (fn) => {
		return dataToString(fn) == '[object Function]';
	},
	isDate: (date) => {
		return dataToString(date) == '[object Date]';
	},
	isJson: (json) => {
		return dataToString(json) == '[object JSON]';
	},
	isPerson: (per) => {
		return per instanceof Person;
	},
	isRegExp: (reg) => {
		return dataToString(reg) == '[object RegExp]';
	},
	isNative: (native) => {
		return typeof native === 'function' && /native code/.test(native.toString())
	}
}
export const letType = function(input) { //返回的是类型 letType('sss') = 'string'
	if (utilTypeOf.notNull(input)) {
		let tof = Object.prototype.toString.call(input);
		return tof.match(/\[object (.*?)\]/)[1].toLowerCase();
	} else {
		return "this is null or undefined"
	}
};
export const getRawType = function(value) { //返回数据类型
	return Object.prototype.toString.call(value).slice(8, -1)
}
//深拷贝对象、数组
export const shallowClone = function(data) {
	if (utilTypeOf.notNull(data)) {
		let shallow;
		if (utilTypeOf.isArray(data)) {
			shallow = [];
			for (let i = 0; i < data.length; i++) {
				shallow.push(data[i]);
			}
			return shallow;
		} else if (utilTypeOf.isObject(data)) {
			function deepCopy(obj) {
				// 根据obj的类型判断是新建一个数组还是对象
				// let newObj = Array.isArray(obj) ? [] : {};
				let newObj = {};
				// 判断传入的obj存在，且类型为对象
				if (obj && typeof obj === 'object') {
					for (key in obj) {
						// 如果obj的子元素是对象，则进行递归操作
						if (obj[key] && typeof obj[key] === 'object') {
							newObj[key] = deepCopy(obj[key])
						} else {
							// // 如果obj的子元素不是对象，则直接赋值
							newObj[key] = obj[key]
						}
					}
				}
				return newObj // 返回新对象
			}
			return deepCopy(data);
		} else {
			return data;
		}
	} else {
		alert("复制失败,数据不可为空")
		return;
	}
}
//复制文本
export const mycopy = function(text) {
	let textareaEl = document.createElement('textarea');
	textareaEl.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
	textareaEl.value = text;
	document.body.appendChild(textareaEl);
	textareaEl.select();
	let success = document.execCommand('copy');
	document.body.removeChild(textareaEl);
	return success;
}
//文字截断
export const truncateFilter = function(text = "", length = 100, truncate = "...") {
	if (text.length >= length) {
		return text.substring(0, length) + truncate
	} else {
		if (text.length <= 0) {
			return text = false
		}
		return text
	}
}
//防抖  防抖的含义就是让某个时间期限（如上面的1000毫秒）内，事件处理函数只执行一次。
export const debounce = (function() {
	/*
		fn() {
			debounce(() => {
				//防抖函数内执行部分
			}, 500)
		}
	*/
	let timer = 0
	return function(callback, ms) {
		clearTimeout(timer)
		timer = setTimeout(callback, ms)
	}
})()
//节流 让函数执行一次后，在某个时间段内暂时失效，过了这段时间后再重新激活
export const throttle = function(func, delay) {
	/*
		throttle(handle, 1000)
	*/
	let timer = null;
	return function() {
		let context = this;
		let args = arguments;
		if (!timer) {
			timer = setTimeout(function() {
				func.apply(context, args);
				timer = null;
			}, delay);
		}
	}
}
//格式化时间
export const formatDate = function(now, mask) { //formatDate(d,"yyyy-MM-dd"))
	let d = now;
	let zeroize = function(value, length) {
		if (!length) length = 2;
		value = String(value);
		for (let i = 0, zeros = ''; i < (length - value.length); i++) {
			zeros += '0';
		}
		return zeros + value;
	};

	return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function($0) {
		switch ($0) {
			case 'd':
				return d.getDate();
			case 'dd':
				return zeroize(d.getDate());
			case 'ddd':
				return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
			case 'dddd':
				return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
			case 'M':
				return d.getMonth() + 1;
			case 'MM':
				return zeroize(d.getMonth() + 1);
			case 'MMM':
				return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
			case 'MMMM':
				return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
					'November', 'December'
				][d.getMonth()];
			case 'yy':
				return String(d.getFullYear()).substr(2);
			case 'yyyy':
				return d.getFullYear();
			case 'h':
				return d.getHours() % 12 || 12;
			case 'hh':
				return zeroize(d.getHours() % 12 || 12);
			case 'H':
				return d.getHours();
			case 'HH':
				return zeroize(d.getHours());
			case 'm':
				return d.getMinutes();
			case 'mm':
				return zeroize(d.getMinutes());
			case 's':
				return d.getSeconds();
			case 'ss':
				return zeroize(d.getSeconds());
			case 'l':
				return zeroize(d.getMilliseconds(), 3);
			case 'L':
				let m = d.getMilliseconds();
				if (m > 99) m = Math.round(m / 10);
				return zeroize(m);
			case 'tt':
				return d.getHours() < 12 ? 'am' : 'pm';
			case 'TT':
				return d.getHours() < 12 ? 'AM' : 'PM';
			case 'Z':
				return d.toUTCString().match(/[A-Z]+$/);
				// Return quoted strings with the surrounding quotes removed
			default:
				return $0.substr(1, $0.length - 2);
		}
	});
};
//去掉前后空格
export const trim = function(str) { /*str 要去空格的字符串*/
	return str.replace(/(^\s*)|(\s*$)/g, '');
};
//在范围内随机生成整数
export const randomInteger = function getRandomInt(min, max) { /*min 最小值， max 最大值*/
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//生成验证码
export const getValidCode = function(len) { /*len 长度*/
	let strSource = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789';
	let res = '',
		idx = 0;
	for (let i = 0; i < len; i++) {
		idx = Math.floor(Math.random() * strSource.length);
		res += strSource.substring(idx, idx + 1);
	}
	return res;
}
//浮点数直接截位函数  
export const formatnumber = function(value, num) {
	let tmp, idx, len, i
	tmp = value.toString();
	idx = tmp.indexOf('.');
	len = tmp.length;
	if (num == 0) {
		if (idx != -1)
			tmp = tmp.substring(0, idx);
	} else {
		if (idx == -1) {
			tmp = tmp + ".";
			for (i = 1; i <= num; i++)
				tmp = tmp + "0";
		} else {
			tmp = tmp.substring(0, idx + num + 1);
			for (i = len; i <= idx + num; i++)
				tmp = tmp + "0";
		}
	}
	return tmp
}
//截位带四舍五入  
export const roundFormatnumber = function(value, num) { //四舍五入  
	let a_str = formatnumber(value, num);
	let a_int = parseFloat(a_str);
	if (value.toString().length > a_str.length) {
		let b_str = value.toString().substring(a_str.length, a_str.length + 1)
		let b_int = parseFloat(b_str);
		if (b_int < 5) {
			return a_str
		} else {
			let bonus_str, bonus_int;
			if (num == 0) {
				bonus_int = 1;
			} else {
				bonus_str = "0."
				for (let i = 1; i < num; i++)
					bonus_str += "0";
				bonus_str += "1";
				bonus_int = parseFloat(bonus_str);
			}
			a_str = formatnumber(a_int + bonus_int, num)
		}
	}
	return a_str
}
//记忆函数：缓存函数的运算结果
export const cached = function(fn) {
	let cache = Object.create(null);
	return function cachedFn(str) {
		let hit = cache[str];
		return hit || (cache[str] = fn(str))
	}
}
//横线转驼峰命名
export const camelize = function(str) {
	let camelizeRE = /-(\w)/g;
	return str.replace(camelizeRE, function(_, c) {
		return c ? c.toUpperCase() : '';
	})
}
//驼峰命名转横线命名：拆分字符串，使用 - 相连，并且转换为小写
export const hyphenate = function(str) {
	let hyphenateRE = /\B([A-Z])/g;
	return str.replace(hyphenateRE, '-$1').toLowerCase()
}
//字符串首位大写
export const capitalize = function(str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}
//将属性混合到目标对象中
export const extendObj = function(to, _from) {
	for (let key in _from) {
		to[key] = _from[key];
	}
	return to
}

// export const
// export const
// export const

//base64数据导出文件，文件下载
export const downloadFile = function(filename, data) {
	let DownloadLink = document.createElement('a');

	if (DownloadLink) {
		document.body.appendChild(DownloadLink);
		DownloadLink.style = 'display: none';
		DownloadLink.download = filename;
		DownloadLink.href = data;

		if (document.createEvent) {
			let DownloadEvt = document.createEvent('MouseEvents');

			DownloadEvt.initEvent('click', true, false);
			DownloadLink.dispatchEvent(DownloadEvt);
		} else if (document.createEventObject)
			DownloadLink.fireEvent('onclick');
		else if (typeof DownloadLink.onclick == 'function')
			DownloadLink.onclick();

		document.body.removeChild(DownloadLink);
	}
}

//返回一个由一个给定对象的自身可枚举属性组成的数组
export const objKeys = function(object) {
	let result = []
	for (let key in object) {
		object.hasOwnProperty(key) && (result.push(key))
	}
	return result
}
//返回一个给定对象自身的所有可枚举属性值的数组
export const objValues = function(object) {
	let result = []
	for (let key in object) {
		object.hasOwnProperty(key) && (result.push(object[key]))
	}
	return result
}
//添加多个属性--el dom节点， attrs 属性对象{}
export const setAttributes = function(el, attrs) {
	for (let key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}
