$(function(){
        // 初始化右侧滚动条
        // 这个方法定义在scroll.js中
        resetui()
        
        //给发送按钮绑定一个鼠标点击事件
        $('#btnSend').on('click',function(){
        	
        	//获取用户输入的内容  去除两端空格
        	var text = $('#ipt').val().trim();
        	//判断输入内容是否为空
        	if(text.length <= 0){
        		//输入空格内容时,清空对话框文字
        		return $('#ipt').val('');
        	}
        	
        	//如果用户输入了聊天内容,就需要把用户输入的聊天内容追加到页面上显示
        	$('#talk_list').append(' <li class="right_word"><img src="img/person02.png" /> <span>'+ text+ '</span></li>')
        	//清空对话框文字
        	 $('#ipt').val('');
        	 
        	//重置滚动条位置
        	resetui()
        	//发起请求,获取聊天内容
        	getMsg(text);
        });
       
       
       //获取聊天机器人发送回来的消息
       function getMsg(text){
       	
       	$.ajax({
       		method:"GET",
       		url:"http://www.liulongbin.top:3006/api/robot",
       	    data:{
       	    	spoken:text
       	    },
       	    success:function(res){
       	    	//console.log(res);
       	    	
       	    	if(res.message === 'success'){
       	    		//接收聊天机器人返回的消息
       	    		var msg = res.data.info.text;
       	    		$('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span> ' +msg + ' </span></li> ')
       	    		 
		        	//重置滚动条位置
		        	resetui()
		        	
		        	//调用getVoice函数
		        	getVoice(msg);
       	    	}
       	    }
       	});
       	
    };
     
	//把机器人回复的文字转化为语音
	    function getVoice(text){
	    	
	    	$.ajax({
	       		method:"GET",
	       		url:"http://www.liulongbin.top:3006/api/synthesize",
	       	    data:{
	       	    	text:text
	       	    },
		        success:function(res){
		       		//console.log(res)
		       		if(res.status === 200){
		       			//播放语音
		       			$('#voice').attr('src',res.voiceUrl);
		       		}
		       	}
	       		
	        })
	    }   
       	 
    //回车键发送对话框文字 
     $('#ipt').on('keyup',function(e){
     	//console.log(e.keyCode);
     	if(e.keyCode === 13){
     		$('#btnSend').click();
     	}
     	
     });
     
    
});