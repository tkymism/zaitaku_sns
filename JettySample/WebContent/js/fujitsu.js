/**
 * グローバル変数
 */
var fujitsu = fujitsu || {};

/**
 * Loginクラス
 */
(function(fujitsu) {
  "use strict";

  var Login = function() {
    /*----------------------------------------
      Private Objects
    ----------------------------------------*/
    var ERR_ID = 1;
    var ERR_PASSWORD = 2;
    var ERR_NOT_EXIST = 3;
    var ERR_LOGIN = 4;
    var ERR_MESSAGE_ID = "IDが入力されていません。";
    var ERR_MESSAGE_PASS = "パスワードが入力されていません。";
    var ERR_MESSAGE_NOT_EXIST = "このIDは登録されていません。";
    var ERR_MESSAGE_LOGIN = "IDまたはパスワードに誤りがあります";

    /*----------------------------------------
      Private Methods
    ----------------------------------------*/
    var _submit = function() {
      var errCode = 0, data;

      errCode = _isValidated();
      if (errCode > 0) {
        _setFocusErrComponent(errCode);
        return;
      }

      data = localStorage.getItem($("#login_id").val());

      _clearError();
      _submitLogin(data);
    };

    var _submitLogin = function(data) {
      // ローディング表示
      $.mobile.loading("show");

      // リクエスト送信
      // $.ajax({
      //   async: false,
      //   url: "/JettySample/LoginServlet",
      //   type: "POST",
      //   data: JSON.stringify(data),
      //   dataType: "html",
      //   timeout: 30000
      // }).done(function(res) {
      //   // TODO
      //   console.log("SUCCESS!!");
      //   console.log(res);
      // }).fail(function() {
      //   // TODO
      //   console.log("ERROR!!");
      // }).always(function() {
      //   // ローディング非表示
      //   $.mobile.loading("hide");
      // });
      // return false;
      $.mobile.changePage("/JettySample/LoginServlet", {
        type: "POST",
        data: "data=" + JSON.stringify(data)
      });
    };

    var _isValidated = function() {
      var data;
      if (!$("#login_id").val()) {
        return ERR_ID;
      }
      if (!$("#login_pw").val()) {
        return ERR_PASSWORD;
      }

      // データの取得
      data = JSON.parse(localStorage.getItem($("#login_id").val()));
      if (!data) {
        return ERR_NOT_EXIST;
      }

      if (data.password !== $("#login_pw").val()) {
        return ERR_LOGIN;
      }

      return 0;
    };

    var _setFocusErrComponent = function(errCode) {
      $(".ui-input-text").removeClass("ui-input-err-text");

      switch(errCode) {
      case ERR_ID:
        $("#login_id").parent().addClass("ui-input-err-text");
        $("#login_messageArea").text(ERR_MESSAGE_ID);
        break;
      case ERR_PASSWORD:
        $("#login_pw").parent().addClass("ui-input-err-text");
        $("#login_messageArea").text(ERR_MESSAGE_PASS);
        break;
      case ERR_NOT_EXIST:
        $("#login_messageArea").text(ERR_MESSAGE_NOT_EXIST);
        break;
      case ERR_LOGIN:
        $("#login_messageArea").text(ERR_MESSAGE_LOGIN);
        break;
      default:
        break;
      }
    };

    var _clearError = function() {
      $(".ui-input-text").removeClass("ui-input-err-text");
      $("#login_messageArea").text("");
    };

    /*----------------------------------------
      Public Methods
    ----------------------------------------*/
    var _init = function() {
      $(document).off("click", "#login_submit", _submit);
      $(document).on("click", "#login_submit", _submit);
    };

    return {
      init: _init
    };
  };

  // 名前空間にクラスを追加する
  fujitsu.login = Login || {};

})(fujitsu || (fujitsu = {}));

/**
 * Registerクラス
 */
(function(fujitsu) {
  "use strict";

  var Register = function() {
    /*----------------------------------------
      Private Objects
    ----------------------------------------*/
    var ERR_FAMILY_NAME = 1;
    var ERR_FIRST_NAME = 2;
    var ERR_KANA_FAMILY_NAME = 3;
    var ERR_KANA_FIRST_NAME = 4;
    var ERR_YEAR = 5;
    var ERR_MONTH = 6;
    var ERR_DAY = 7;
    var ERR_PASSWORD = 8;
    var ERR_PASSWORD2 = 9;
    var ERR_MESSAGE_REQUIRED = "必須項目が入力されていません。";
    var ERR_MESSAGE_PASSWORD_VALUE = "パスワードは8桁で入力してください。";
    var ERR_MESSAGE_PASSWORD_DIFF = "パスワードが一致しません。";

    /*----------------------------------------
      Private Methods
    ----------------------------------------*/
    var _submit = function() {
      var storageNum = _createStorageNum(),
          errCode = 0,
          key, data;

      errCode = _isValidated();
      if (errCode > 0) {
        _setFocusErrComponent(errCode, ERR_MESSAGE_REQUIRED);
        return;
      }

      errCode = _checkPassword();
      if (errCode > 0) {
        return;
      }

      key = "WS" + ("00" + storageNum).slice(-3);
      data = _createData();

      // データの保存
      localStorage.setItem(key, JSON.stringify(data));

      // エラー情報をクリアする
      _clearError();
      // 確認メッセージの表示
      $("#register_createId").text(key);
      $("#register_confirm").popup("open");
    };

    var _isValidated = function() {
      if (!$("#register_familyName").val()) {
        return ERR_FAMILY_NAME;
      }
      if (!$("#register_firstName").val()) {
        return ERR_FIRST_NAME;
      }
      if (!$("#register_kanaFamilyName").val()) {
        return ERR_KANA_FAMILY_NAME;
      }
      if (!$("#register_kanaFirstName").val()) {
        return ERR_KANA_FIRST_NAME;
      }
      if (!$("#register_year").val()) {
        return ERR_YEAR;
      }
      if (!$("#register_month").val()) {
        return ERR_MONTH;
      }
      if (!$("#register_day").val()) {
        return ERR_DAY;
      }
      if (!$("#register_password").val()) {
        return ERR_PASSWORD;
      }
      if (!$("#register_password2").val()) {
        return ERR_PASSWORD2;
      }

      return 0;
    };

    var _checkPassword = function() {
      var pass = $("#register_password").val(),
          pass2 = $("#register_password2").val();

      if (pass.length !== 8) {
        _setFocusErrComponent(ERR_PASSWORD, ERR_MESSAGE_PASSWORD_VALUE);
        return ERR_PASSWORD;
      }
      if (pass.length !== 8) {
        _setFocusErrComponent(ERR_PASSWORD2, ERR_MESSAGE_PASSWORD_VALUE);
        return ERR_PASSWORD2;
      }
      if (pass !== pass2) {
        _setFocusErrComponent(ERR_PASSWORD, ERR_MESSAGE_PASSWORD_DIFF);
        return ERR_PASSWORD;
      }
    };

    var _setFocusErrComponent = function(errCode, errMessage) {
      $(".ui-input-text").removeClass("ui-input-err-text");

      switch(errCode) {
      case ERR_FAMILY_NAME:
        $("#register_familyName").parent().addClass("ui-input-err-text");
        break;
      case ERR_FIRST_NAME:
        $("#register_firstName").parent().addClass("ui-input-err-text");
        break;
      case ERR_KANA_FAMILY_NAME:
        $("#register_kanaFamilyName").parent().addClass("ui-input-err-text");
        break;
      case ERR_KANA_FIRST_NAME:
        $("#register_kanaFirstName").parent().addClass("ui-input-err-text");
        break;
      case ERR_YEAR:
        $("#register_year").parent().addClass("ui-input-err-text");
        break;
      case ERR_MONTH:
        $("#register_month").parent().addClass("ui-input-err-text");
        break;
      case ERR_DAY:
        $("#register_day").parent().addClass("ui-input-err-text");
        break;
      case ERR_PASSWORD:
        $("#register_password").parent().addClass("ui-input-err-text");
        break;
      case ERR_PASSWORD2:
        $("#register_password2").parent().addClass("ui-input-err-text");
        break;
      default:
        break;
      }
      $("#register_messageArea").text(errMessage);
    };

    var _createStorageNum = function() {
      var num = localStorage.getItem("storage_num"),
          ret;

      if (num) {
        num = parseInt(num, 10);
        ret = (num + 1);
      } else {
        ret = 1;
      }

      localStorage.setItem("storage_num", ret);
      return ret;
    };

    var _createData = function() {
      var data = {};

      data.familyName = $("#register_familyName").val();
      data.firstName = $("#register_firstName").val();
      data.kanaFamilyName = $("#register_kanaFamilyName").val();
      data.kanaFirstName = $("#register_kanaFirstName").val();
      data.birth = String($("#register_wareki").val()) +
                   String(("0" + $("#register_year").val()).slice(-2)) +
                   String(("0" + $("#register_month").val()).slice(-2)) +
                   String(("0" + $("#register_day").val()).slice(-2));
      data.sex = $("#register_sex").val();
      data.password = $("#register_password").val();

      return data;
    };

    var _clearError = function() {
      $(".ui-input-text").removeClass("ui-input-err-text");
      $("#register_messageArea").text("");
    };

    var _closePopup = function() {
      location.href = "/JettySample";
    };

    /*----------------------------------------
      Public Methods
    ----------------------------------------*/
    var _init = function() {
      $(document).off("click", "#register_submit", _submit);
      $(document).on("click", "#register_submit", _submit);

      $(document).off("popupafterclose", "#register_confirm", _closePopup);
      $(document).on("popupafterclose", "#register_confirm", _closePopup);
    };

    return {
      init: _init
    };
  };

  // 名前空間にクラスを追加する
  fujitsu.register = Register || {};

})(fujitsu || (fujitsu = {}));

/**
 * 共通処理クラス
 */
(function(fujitsu) {
  "use strict";

  var Common = (function() {
    /*----------------------------------------
      Import Modules
    ----------------------------------------*/
    var Login = fujitsu.login;
    var Register = fujitsu.register;

    /*----------------------------------------
      Private Objects
    ----------------------------------------*/
    var _login = new Login();
    var _register = new Register();

    /*----------------------------------------
      Private Methods
    ----------------------------------------*/
    var _initPage = function(e) {
      var id = e.target.id;

      if (id) {
        switch(id) {
        case "login":
          _login.init();
          break;
        case "register":
          _register.init();
          break;
        default:
          break;
        }
      }
    };

    /*----------------------------------------
      Public Methods
    ----------------------------------------*/
    var _init = function(e) {
      _initPage(e);
    };

    return {
      init: _init
    };
  }());

  // 名前空間にクラスを追加する
  fujitsu.common = Common || {};

})(fujitsu || (fujitsu = {}));

/**
 * 関数即実行
 */
(function(global) {
  "use strict";
  $(global.document).bind("pageinit", fujitsu.common.init);
}(this));
