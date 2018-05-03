import axios from 'axios'
import {hex_md5 as md5} from './md5'
import urlObj from './url'

var encode=encodeURIComponent;
axios.defaults.withCredentials=true;

export function req ( csjson, type = 'POST') {
  const url = urlObj.baseUrl()
  type = type.toLocaleLowerCase()
  return axios({
    method: type,
    url: url,
    data: csjson,
    timeout: 10000
  })
}

export function reqMd5(csjson) {
  let key = sjNum();
  const url=urlObj.baseUrl();
	csjson.SIGN = getSignByJson(csjson,key);
  console.log(url);
  return axios.post(url,csjson,{
    headers: {
        "Content-Type":"application/json;charset=utf-8"
          },
        withCredentials : true
  });
}

	// 随机数字
	function sjNum() {
		// nonceStr
		var chars = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B',
			'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
			'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b',
			'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
			'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
		var nums = "";
		for (var i = 0; i < 8; i++) {
			var id = parseInt(Math.random() * 62);
			nums += chars[id];
		}
		return nums;
	}

	// --排序
	function iSort(arr, fn) {
		fn = fn || function(a, b) {
			//	return a.toLowerCase() > b.toLowerCase();
				return a > b ;
			};
		for (var i = 1; i < arr.length; i++) {
			var key = arr[i];
			var j = i - 1;
			while (j >= 0 && fn(arr[j], key)) {
				arr[j + 1] = arr[j];
				j--;
			}
			arr[j + 1] = key;
		}
		return arr;
	}

function getSignByJson(csjson, key) {
		var arr = [];
		csjson.RANDOMSTR=key;
		for ( var k in csjson) {
			if (csjson[k] !== '' && csjson[k] !== null && csjson[k] !== undefined)
				arr.push(k + '=' + encode(csjson[k]) + '&');
		}
		arr = iSort(arr);
		var commonStr = '';
		for ( var j = 0;j<arr.length;j++) {
			commonStr += arr[j];
		}
		commonStr = commonStr.substr(0,(commonStr.length-1));
		//console.log(commonStr);
		return md5(commonStr).toUpperCase();
	}

