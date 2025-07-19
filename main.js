enchant();

var Passward = window.localStorage.getItem("コード");
var Time = new Date();
var Now = [];
Now[0] = Time.getFullYear();
Now[1] = Time.getMonth() + 1;
Now[2] = Time.getDate();
Now[3] = Time.getHours();
Now[4] = Time.getMinutes();
Now[5] = Time.getSeconds();

for(var I = 1; I < 6; I++) if(Now[I] < 10) Now[I] = "0" + Now[I];

Now = Now[0] + "/" + Now[1] + "/" + Now[2] + " " + Now[3] + ":"+ Now[4] + ":"+ Now[5];

function Game_load(width,height){
  var game = new Game(width,height);
  game.fps = 20;
  game.onload = function(){
    var Main_Scene = function(Datas){
      var scene = new Scene;

      var Buttons = [];
      var Selects = [];
      var Text_Areas = [];
      var I = 0;
      var J = 0;
      
      var Save_Times = window.localStorage.getItem("時間");
      
      if(!Save_Times) Save_Times = {};
      else{
        Save_Times = JSON.parse(Save_Times);
        if(Save_Times.ストレージ0) Now = Save_Times.ストレージ0;
        console.log(Save_Times);
      };

      Create_Select(width/4*0,height/10*2,width/2,height/10);
      Create_Button(width/4*0,height/10*0,width/2,height/10,"現在時刻に設定");
      Create_Text_Area(width/4*0,height/10*1,width/2,height/10,Now,"時間を入力");
      Create_Text_Area(width/4*0,height/10*3,width/2,height/10,"","タイトルを入力");
      Create_Text_Area(width/4*0,height/10*4,width/2,height/10,"","ピンポイントを入力");
      Create_Text_Area(width/4*0,height/10*5,width/2,height/10,"入れ忘れ防止","検索ワードを入力");
      Create_Text_Area(width/4*0,height/10*6,width/2,height/10,"入れ忘れ防止","URLを入力");
      Create_Text_Area(width/4*0,height/10*7,width/2,height/10,"","備考を入力");
      Create_Text_Area(width/4*0,height/10*8,width/2,height/10,Passward,"コードを入力");
      Create_Button(width/4*2,height/10*0,width/2,height/10,"時刻保存1");
      Create_Button(width/4*2,height/10*1,width/2,height/10,"時刻保存2");
      Create_Button(width/4*2,height/10*2,width/2,height/10,"URL保存");
      Create_Button(width/4*2,height/10*3,width/2,height/10,"検索ワード保存");
      Create_Button(width/4*2,height/10*4,width/2,height/10,"","時刻");
      Create_Button(width/4*2,height/10*5,width/2,height/10,"","時刻");
      Create_Button(width/4*2,height/10*6,width/2,height/10,"","URL");
      Create_Button(width/4*2,height/10*7,width/2,height/10,"","検索ワード");
      Create_Button(width/4*0,height/10*9,width/2,height/10,"保存");
      Create_Button(width/4*2,height/10*8,width/2,height/10,"終了");
      Create_Button(width/4*2,height/10*9,width/2,height/10,"確認");
      
      for(var I = 1; I < 5; I++){
        if(Save_Times["ストレージ"+I]) Buttons[I+4]._element.value = Save_Times["ストレージ"+I];
      };
      

      function Create_Select(X,Y,W,H){
        I = Selects.length;
        Selects[I] = new Entity();
        Selects[I].moveTo(X,Y);
        Selects[I].width = W;
        Selects[I].height = H;
        Selects[I]._element = document.createElement("select");

        Option = [];
        Select_Data = ["入れ忘れ防止","二次元","三次元","","取り消し"];

        for (var i = 0; i < Select_Data.length; i++){
          Option[i] = document.createElement("option");
          Option[i].text = Select_Data[i];
          Option[i].value = Select_Data[i];
          Selects[I]._element.appendChild(Option[i]);
        };

        scene.addChild(Selects[I]);
        return;
      };

      function Create_Text_Area(X,Y,W,H,V,P){
        J = Text_Areas.length;
        Text_Areas[J] = new Entity();
        Text_Areas[J].moveTo(X,Y);
        Text_Areas[J].width = W;
        Text_Areas[J].height = H;
        Text_Areas[J]._element = document.createElement("input");
        Text_Areas[J]._element.type = "textarea";
        Text_Areas[J]._element.value = V;
        Text_Areas[J]._element.placeholder = P;
        scene.addChild(Text_Areas[J]);
        return;
      };

      function Create_Button(X,Y,W,H,V1,V2){
        if(!V2) V2 = V1;
        I = Buttons.length;
        Buttons[I] = new Entity();
        Buttons[I].moveTo(X,Y);
        Buttons[I].width = W;
        Buttons[I].height = H;
        Buttons[I]._element = document.createElement('input');
        Buttons[I]._element.type = "submit";
        Buttons[I]._element.動作 = V2;
        Buttons[I]._element.value = V1;
        Buttons[I].backgroundColor = "buttonface";
        scene.addChild(Buttons[I]);
        Buttons[I]._element.onclick = function(e){
          switch(this.動作){
            case "URL保存":
              Temp = Text_Areas[4]._element.value;
              Buttons[7]._element.value = Temp;
              Save_Times["ストレージ3"] = Temp;
              window.localStorage.setItem("時間",JSON.stringify(Save_Times));
              break;
            case "検索ワード保存":
              Temp = Text_Areas[3]._element.value;
              Buttons[8]._element.value = Temp;
              Save_Times["ストレージ4"] = Temp;
              window.localStorage.setItem("時間",JSON.stringify(Save_Times));
              break;
            case "URL":
              Text_Areas[4]._element.value = this.value;
              break;
            case "検索ワード":
              Text_Areas[3]._element.value = this.value;
              break;
            case "時刻":
              Text_Areas[0]._element.value = this.value;
              break;
            case "時刻保存1":
            case "時刻保存2":
              Save_Times.ナンバー = this.value.replace(/時刻保存/,"");
              Save_Times.ナンバー = JSON.parse(Save_Times.ナンバー);
              Buttons[Save_Times.ナンバー+4]._element.value = Text_Areas[0]._element.value;
              Save_Times["ストレージ"+Save_Times.ナンバー] = Text_Areas[0]._element.value;
              window.localStorage.setItem("時間",JSON.stringify(Save_Times));
              break;
            case "現在時刻に設定":
              Time = new Date();
              Now = [];
              Now[0] = Time.getFullYear();
              Now[1] = Time.getMonth() + 1;
              Now[2] = Time.getDate();
              Now[3] = Time.getHours();
              Now[4] = Time.getMinutes();
              Now[5] = Time.getSeconds();

              for(var J = 1; J < 6; J++) if(Now[J] < 10) Now[J] = "0" + Now[J];

              Now = Now[0] + "/" + Now[1] + "/" + Now[2] + " " + Now[3] + ":"+ Now[4] + ":"+ Now[5];
              Text_Areas[0]._element.value = Now;
              break;
          case "確認":
              Send_Data = {};
              Send_Data.次元 = Selects[0]._element.value;
              Send_Data.射精 = Text_Areas[0]._element.value;
              Send_Data.コード = Text_Areas[6]._element.value;
              Send_Data.確認 = true;
              Passward = Send_Data.コード;
              window.localStorage.setItem("コード",Passward);
              game.pushScene(Loading_Scene());
              Send_Data = JSON.stringify(Send_Data);
              fetch("https://script.google.com/macros/s/AKfycbyhqrKv_PI4_XUz4bvR4mK_lopajKMhNpUnxC23NRQMfcJdn6nHZ-s9CDXfo-v1-8PEXA/exec",
                    {
                      method: 'POST',
                      body:Send_Data
                    }
                   )
                .then(res => res.json())
                .then(result => {
                game.popScene();
                game.replaceScene(Result_Scene(result));
              },);
              break;
            case "保存":
              Send_Data = {};
              Send_Data.開始 = Buttons[5]._element.value;
              Send_Data.射精 = Buttons[6]._element.value;
              Send_Data.次元 = Selects[0]._element.value;
              Send_Data.タイトル = Text_Areas[1]._element.value;
              Send_Data.ピンポイント = Text_Areas[2]._element.value;
              Send_Data.検索ワード = Text_Areas[3]._element.value;
              Send_Data.URL = Text_Areas[4]._element.value;
              Send_Data.備考 = Text_Areas[5]._element.value;
              Send_Data.コード = Text_Areas[6]._element.value;
              Passward = Send_Data.コード;
              window.localStorage.setItem("コード",Passward);
              game.pushScene(Loading_Scene());
              fetch("https://script.google.com/macros/s/AKfycbyhqrKv_PI4_XUz4bvR4mK_lopajKMhNpUnxC23NRQMfcJdn6nHZ-s9CDXfo-v1-8PEXA/exec",
                    {
                      method: 'POST',
                      body:JSON.stringify(Send_Data)
                    }
                   )
                .then(res => res.json())
                .then(result => {
                game.popScene();
                if(result[0]!="コードが不一致。") window.localStorage.setItem("時間",JSON.stringify({ストレージ0:Send_Data.射精}));
                game.replaceScene(Result_Scene(result));
              },);
              break;
            case "終了":
              Send_Data = {};
              Send_Data.開始 = Buttons[5]._element.value;
              Send_Data.終了 = Buttons[6]._element.value;
              Send_Data.備考 = Text_Areas[5]._element.value;
              Send_Data.コード = Text_Areas[6]._element.value;
              Passward = Send_Data.コード;
              window.localStorage.setItem("コード",Passward);
              game.pushScene(Loading_Scene());
              fetch("https://script.google.com/macros/s/AKfycbyhqrKv_PI4_XUz4bvR4mK_lopajKMhNpUnxC23NRQMfcJdn6nHZ-s9CDXfo-v1-8PEXA/exec",
                    {
                      method: 'POST',
                      body:JSON.stringify(Send_Data)
                    }
                   )
                .then(res => res.json())
                .then(result => {
                game.popScene();
                if(result[0]!="コードが不一致。") window.localStorage.setItem("時間",JSON.stringify({ストレージ0:Send_Data.終了}));
                game.replaceScene(Result_Scene(result));
              },);
              break;
          };
        };
        return;
      };

      return scene;
    };

    var Loading_Scene = function(){
      var scene = new Scene();

      var Background = new Entity();
      Background._element = document.createElement("img");
      Background._element.src = "https://raw.githubusercontent.com/compromise-satisfaction/novel_game/gh-pages/画像/半透明(黒).png";
      Background.width = width;
      Background.height = height;

      var Loading = new Entity();
      Loading._element = document.createElement("img");
      Loading._element.src = "https://raw.githubusercontent.com/compromise-satisfaction/novel_game/gh-pages/画像/読み込み中.gif";
      Loading.width = width;
      Loading.height = width/5;
      Loading.y = height/2 - Loading.height/2;

      scene.addChild(Background);
      scene.addChild(Loading);

      return scene;
    };

    var Result_Scene = function(Datas){
      
      console.log(Datas);
      
      var scene = new Scene();

      Text_Area = new Entity();
      Text_Area.width = width;
      Text_Area.height = width/5;
      Text_Area.y = height/2 - Text_Area.height/2;
      Text_Area._element = document.createElement("textarea");
      Text_Area._element.value = Datas;
      Text_Area._element.placeholder = "リザルト";
      scene.addChild(Text_Area);

      var Buttons = [];

      Create_Button(width/4,height/10*9,width/2,height/10,"戻る");

      function Create_Button(X,Y,W,H,V){
        I = Buttons.length;
        Buttons[I] = new Entity();
        Buttons[I].moveTo(X,Y);
        Buttons[I].width = W;
        Buttons[I].height = H;
        Buttons[I]._element = document.createElement('input');
        Buttons[I]._element.type = "submit";
        Buttons[I]._element.value = V;
        Buttons[I].backgroundColor = "buttonface";
        scene.addChild(Buttons[I]);
        Buttons[I]._element.onclick = function(e){
          switch(this.value){
            case "戻る":
              game.replaceScene(Main_Scene());
              break;
          };
        };
        return;
      };

      return scene;
    };

    game.replaceScene(Main_Scene());
};
game.start();
};
