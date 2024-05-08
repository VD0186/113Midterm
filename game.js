var count = 0;
var opened = 0;
var tried = -1;
var tried_number = 0;
var cards = [0, 1, 1, 2, 2, 3, 3, 4, 4].sort(() => Math.random() - 0.5);
var graphics = ['☁', '■', '★', '♠︎', '♥︎', '♦︎', '♣︎', '☀', '✈︎', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'].sort(() => Math.random() - 0.5);

function cliclBotton(button_number) {
    let graphic = cards[button_number];
    if (tried != 0) {
        changePageTitle(graphic)
        count+=1;
        if (tried == -1) {
            changeCardDiv(graphic, button_number);
            tried_number = button_number;
            tried = graphic;
        }
        else {
            if ((graphic == tried)||(graphic == 0)) {
                changeCardDiv(graphic, button_number);
                opened+=2
                tried = -1;
                tried_number = 0;
            }
            else {
                changeCardDiv(graphic, button_number);
                tried = 0;
                setTimeout(function() {
                    document.getElementById("box"+(tried_number+1)).innerHTML = '<button onclick="cliclBotton('+tried_number+')" id="innerButton"><p>翻牌</p></button>';
                    document.getElementById("box"+(button_number+1)).innerHTML = '<button onclick="cliclBotton('+button_number+')" id="innerButton"><p>翻牌</p></button>';
                    document.title = "翻牌"
                    tried = -1;
                    tried_number = 0;
                }, 1000);
            }
        }
        if (opened == 8) {
            tried = 0;
            setTimeout(function() {
                document.title = "大成功！"
                if (opened/count == 1) {var describe = "你的直覺真是太準了";}
                else if (opened/count >= 0.8) {var describe = "差一點就完全命中了";}
                else if (opened/count >= 0.45) {var describe = "還不錯喔";}
                else {var describe = "你的記憶力不太好喔";}
                document.getElementById("mainBox").innerHTML = '<p id="endtext">你贏了</p><p id="endtext">翻牌次數：'+count+'</p><p id="endtext">命中率：'+100*opened/count+'%</p><p id="endtext">'+describe+'</p><button onclick="location.reload()"><p id="endtext">再試一次</p></button>';
            }, 2000);
        }
        if (graphic == 0) {
            tried = 0;
            setTimeout(function() {
                if (opened/count >= 0.8) {var describe = "太可惜了就差一張";}
                else if (opened >= 6) {var describe = "真可惜，只差一組牌";}
                else {var describe = "哀呀";}
                document.getElementById("mainBox").innerHTML = '<p id="endtext">失敗</p><p id="endtext">翻牌次數：'+count+'</p><p id="endtext">命中率：'+100*opened/count+'%</p><p id="endtext">'+describe+'</p><button onclick="location.reload()"><p id="endtext">再試一次</p></button>';
            }, 2000);
        }
    }

}

function changePageTitle(graphic_number) {
    if (graphic_number == 0) {
        document.title = "運氣不佳......";
    }
    else {
        document.title = graphics[graphic_number-1]+"！";
    }
}

function changeCardDiv(graphic_number, button_number) {
    if (graphic_number == 0) {
        document.getElementById("box"+(button_number+1)).style.backgroundColor = "red";
        document.getElementById("box"+(button_number+1)).innerHTML = "<p id='innerGraphic'>✖︎</p>";
    }
    else {
        document.getElementById("box"+(button_number+1)).innerHTML = "<p id='innerGraphic'>"+graphics[graphic_number-1]+"</p>";
    }
}