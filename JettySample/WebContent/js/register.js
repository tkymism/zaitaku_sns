/* 自分で追加したものだけ */

$(function() {
	  $('input[type=file]').after('<span></span>');

	  // アップロードするファイルを選択
	  $('input[type=file]').change(function() {
	    var file = $(this).prop('files')[0];

	    // 画像以外は処理を停止
	    if (! file.type.match('image.*')) {
	      $('span').html('');
	      return;
	    }

	    // 画像表示
	    var reader = new FileReader();
	    reader.onload = function() {
	      var img_src = $('<img>').attr('src', reader.result);
	      $('span.uploadImage').html(img_src);
	    };
	    reader.readAsDataURL(file);
	  });
});

/*
function checkFiles() {
	   var fs = document.getElementById("MyFile").file;
	   var disp = document.getElementById("disp");
	   disp.innnerHTML = "";
	   for (var i=0; i<fs.length; i++) {
	      var f = fs[i];
	      disp.innerHTML += "name : " + f.name + "    type : " + f.type + "    size: " + f.size + " KB " + "<br>";
	   }
}
*/