

/* グローバル変数 */

var counter=0; //カウンター

/* 吹き出しを追加する関数 */
function addBal(form){

	//時間取得
	var DD = new Date();
	var Hours = DD.getHours();
	var Minutes = DD.getMinutes();
	var Seconds = DD.getSeconds();


	var str = "str"+counter;

	var str1 = "<div class = \"row msg_container base_sent\" id=bal1>";
	var str2 = "<div class=\"col-md-10 col-xs-10 \" id=\"bal2\">";
	var str3 = "<div class=\"messages msg_sent\" id=\"bal3\">";
	var str4 = "<p id=\"bal4\">";
	var str5 = "<div id=str"+counter+"></div></p>";
	var str6 = "<time id=\"bal5\" datetime=\"\">";
	var str6_2 = Hours+"時"+Minutes+"分"+Seconds+"秒</time>";

	var str7 = "</div></div>";
	var str8 = "<div class=\"col-md-2 col-xs-2 avatar\" id=\"bal6\">";
	var str9 = "<img src=\"http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg\" class=\"img-responsive img-circle\">";
	var str10 = "</div></div>";

	var str11 = "<div id=no"+ (counter+1) +" > </div>";

	var no = "no"+counter;

	//htmlに出力
	document.getElementById(no).innerHTML = str1+str2+str3+str4+str5+str6+str6_2+str7+str8+str9+str10+str11;
	document.getElementById(str).innerHTML = form.myarea.value;

	//カウンター
	counter++;
}

/* テンプレートから入力フォームに挿入する関数 */
function buttonClick(obj){
    var tako;
    tako = obj.selectTemp.options[obj.selectTemp.selectedIndex].value;
    obj.myarea.value = tako;
}

/* チャット画面(未着手) */

$(document).on('click', '.panel-heading span.icon_minim', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('focus', '.panel-footer input.chat_input', function (e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('click', '#new_chat', function (e) {
    var size = $( ".chat-window:last-child" ).css("margin-left");
     size_total = parseInt(size) + 400;
    alert(size_total);
    var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
    clone.css("margin-left", size_total);
});
$(document).on('click', '.icon_close', function (e) {
    //$(this).parent().parent().parent().parent().remove();
    $( "#chat_window_1" ).remove();
});


//////ボツ
////////////////////////絵文字の挿入////////////////////////////////
/*
$(function(){

    var caret_pos;

    function insertTextAtPosision(obj, pos, txt) {

        obj.focus();

        if (jQuery.support.opacity) {

            var s = obj.value;
            var np = pos + txt.length;
            obj.value = s.substr(0, pos) + txt + s.substr(pos);
            obj.setSelectionRange(np, np);

        } else {

            pos.text = txt;
            pos.select();

        }
    }
    function getCaretPosition(obj) {

        obj.focus();
        var pos;

        if (jQuery.support.opacity) {
            pos = obj.selectionStart;
        } else {
            pos = document.selection.createRange();
        }
        return pos;

    }

    $('.emoticon').click(function(){
        path = '<img src="' + $(this).attr('path') + '" alt="'+ $(this).attr('alt') +'" />';
        caret_pos = getCaretPosition($('#textarea_object'));
        insertTextAtPosision(obj, caret_pos, path);
    });
});
*/

/*
  <script>
	function winCenterResister() {
		var w = ( screen.width-640 ) / 2;
		var h = ( screen.height-480 ) / 2;
		window.open("resister.html","","width=640,height=480" + ",left="+w+",top="+h);
	}
	function winCenterSearch() {
		var w = ( screen.width-640 ) / 2;
		var h = ( screen.height-480 ) / 2;
		window.open("search.html","","width=640,height=480" + ",left="+w+",top="+h);
	}
	function winCenterActibity() {
		var w = ( screen.width-640 ) / 2;
		var h = ( screen.height-480 ) / 2;
		window.open("activity.html","","width=640,height=480" + ",left="+w+",top="+h);
	}
	function update_field(elem){
		document.getElementById("target").innerText = document.getElementById("name").value;
	}

function ScrollHalfHeight() {
	alert(screen.height/2);
    window.scrollBy( 0, screen.height/2 );
 }

function readTextArea (form) {
	if(form==null)alert("※文字が入力されていません");
	else {
		//var balloon = document.getElementById("balloon");
		//document.getElementById("body").appendChild(balloon);

		var ele = document.createElement("div");
		ele.setAttribute("class", "row msg_container base_sent");
		ele.setAttribute("id", "bal1");
		var ele2 = document.createElement("div");
		ele2.setAttribute("class","col-md-10 col-xs-10");
		ele2.setAttribute("id", "bal2");
		var ele3 = document.createElement("div");
		ele3.setAttribute("class", "messages msg_sent");
		ele3.setAttribute("id", "bal3");
		var ele4 = document.createElement("p");
		ele4.setAttribute("id", "bal4");
		//送信文字
		var ele5 = document.createElement("div");
		ele5.setAttribute("id", "str");
		//時間
		var ele6 = document.createElement("time");
		ele6.setAttribute("datetime", "2009-11-13T20:00");
		ele6.setAttribute("id", "bal5");
		var ele7 = document.createElement("div");
		ele7.setAttribute("class", "col-md-2 col-xs-2 avatar");
		ele7.setAttribute("id", "bal6");
		var ele8 = document.createElement("img");
		ele8.setAttribute("src", "http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg");
		ele8.setAttribute("class","img-responsive");

		document.getElementById("no0").appendChild(ele);
		document.getElementById("bal1").appendChild(ele2);
		document.getElementById("bal2").appendChild(ele3);
		document.getElementById("bal3").appendChild(ele4);
		document.getElementById("bal4").appendChild(ele5);
		document.getElementById("bal3").appendChild(ele6);
		document.getElementById("bal1").appendChild(ele7);
		document.getElementById("bal6").appendChild(ele8);

		document.getElementById("bal5").innerHTML = "Timothy • 51 min";
		document.getElementById("str").innerHTML = form.myarea.value;

	    counter++;


	}
}*/