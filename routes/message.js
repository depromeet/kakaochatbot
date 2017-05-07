var express = require('express');
var router = express.Router();
var fs = require('fs');






router.post('/message', function(req, res){
		var result = {  };
		// CHECK REQ VALIDITY
        if(!req.body["user_key"] || !req.body["type"] || !req.body["content"]){
            result["success"] = 0;
            result["error"] = "invalid request";
			res.json(result);
            return;
        }

		// 초기 keyboard 버튼일 경우(세션공지||회장번호||만든이)
		if(req.body["content"] == "세션공지" || req.body["content"] == "회장번호" || req.body["content"] == "만든이"){
			fs.readFile( __dirname + "/../data/message.json", 'utf8',  function(err, data){
				var messages = JSON.parse(data);
				// 각 keyboard 버튼에 따른 응답 메시지 설정
				if(req.body["content"] == "세션공지"){
					messages["message"] = {"text" : "*5월 6일 세션 공지입니다* \t 일시: 이번주 토요일 \t 장소: 선정릉역 한국과학창의재단 14층 \t 일정: 팀별 스터디 진행 후 \t  15:00~15:30 세미나 윤상현님 "깃헙 운영하기" 세미나 \t 15:30~18:00 정기 세션 진행"};
				}else if(req.body["content"] == "회장번호"){

					messages["message"] = {"text" : "김동환 010 4457 4497"};

				}else if(req.body["content"] == "만든이"){

					messages["message"] = {"text" : "defflee"};

				}
                else{
					messages["message"] = {"text" : ""};
				}
				fs.writeFile(__dirname + "/../data/message.json",
							 JSON.stringify(messages, null, '\t'), "utf8", function(err, data){
				});
				fs.readFile( __dirname + "/../data/message.json", 'utf8', function (err, data) {
					// 결과 로그 출력
					console.log("Request_user_key : "+req.body["user_key"]);
					console.log("Request_type : keyboard - "+req.body["content"]);
					res.end(data);
					return;
				});
			})
		}
    });









module.exports = router;
