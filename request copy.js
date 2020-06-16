var http = require('http')
const querystring = require('querystring')

// 需要提交的数据
var data = {
	a: 111,
	time: Date.now()
}
var dataString = querystring.stringify(data)	// 转换为字符串格式
var option = {
	hostname: 'localhost',	// 要访问的服务器的ip地址
	port: 5656,  // 要访问的服务器的端口
	path: 'car', // 请求的接口和传递的参数
	method: 'GET'	// 请求方式
}
var req = http.request(option, function(res){
	// console.log('状态码:' + res.statusCode)
	// console.log('响应头:' + JSON.stringify(res.headers))
	res.setEncoding('utf8');
	res.on('data', (chunk) => {
    	console.log(`响应主体: ${chunk}`);
  	});
  	res.on('end', () => {
		console.log('请求结束');
  	});
})

req.on('error', (e) => {
	console.error(`请求遇到问题: ${e.message}`);
});
req.end(); 	// 必须始终调用 req.end() 来表示请求的结束
