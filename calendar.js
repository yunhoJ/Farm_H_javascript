(function () {
    calendarMaker($("#calendarForm"), new Date());
})();

var nowDate = new Date();
function calendarMaker(target, date) {
    if (date == null || date == undefined) {
        date = new Date();
    }
    nowDate = date;
    if ($(target).length > 0) {
        var year = nowDate.getFullYear();
        var month = nowDate.getMonth() + 1;
        $(target).empty().append(assembly(year, month));
    } else {
        console.error("custom_calendar Target is empty!!!");
        return;
    }

    var thisMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);
    var thisLastDay = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0);


    var tag = "<tr>";
    var cnt = 0;
    //빈 공백 만들어주기
    for (i = 0; i < thisMonth.getDay(); i++) {
        tag += "<td></td>";
        cnt++;
    }

    //날짜 채우기
    for (i = 1; i <= thisLastDay.getDate(); i++) {
        if (cnt % 7 == 0) { tag += "<tr>"; }

        tag += "<td>" + i + "</td>";
        cnt++;
        if (cnt % 7 == 0) {
            tag += "</tr>";
        }
    }
    $(target).find("#custom_set_date").append(tag);
    calMoveEvtFn();

    function assembly(year, month) {
        var calendar_html_code =
            "<table class='custom_calendar_table'>" +
            "<colgroup>" +
            "<col style='width:81px'/>" +
            "<col style='width:81px'/>" +
            "<col style='width:81px'/>" +
            "<col style='width:81px'/>" +
            "<col style='width:81px'/>" +
            "<col style='width:81px'/>" +
            "<col style='width:81px'/>" +
            "</colgroup>" +
            "<thead class='cal_date'>" +
            "<th><button type='button' class='prev'><</button></th>" +
            "<th colspan='5'><p><span>" + year + "</span>년 <span>" + month + "</span>월</p></th>" +
            "<th><button type='button' class='next'>></button></th>" +
            "</thead>" +
            "<thead  class='cal_week'>" +
            "<th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>" +
            "</thead>" +
            "<tbody id='custom_set_date'>" +
            "</tbody>" +
            "</table>";
        return calendar_html_code;
    }

    function calMoveEvtFn() {
        //전달 클릭
        $(".custom_calendar_table").on("click", ".prev", function () {
            nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth() - 1, nowDate.getDate());
            calendarMaker($(target), nowDate);
        });
        //다음날 클릭
        $(".custom_calendar_table").on("click", ".next", function () {
            nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate());
            calendarMaker($(target), nowDate);
        });
        //일자 선택 클릭
        $(".custom_calendar_table").on("click", "td", function () {
            $(".custom_calendar_table .select_day").removeClass("select_day");
            $(this).removeClass("select_day").addClass("select_day");
            let k = document.getElementsByClassName("select_day").value;
            $.ajax({
                
                type :"get" ,
                url : "http://주소수정/diary",
                data : {sea : k},
                dataType : 'JSON',
                success : function(data) {
                    console.log("확인");
                    let Le = document.getElementById("diaryFrom");

                    if(data != ""){
                        let h_diary="";

                        h_diary = `<div id="diaryFrom">
                        <table>
                            <th colspan="2">${data.R_PLANT}</th>
                            <tr><td class="title">날씨</td><td class="info">${data.R_WEATHER}</td></tr>
                            <tr><td class="title">최저 기온</td><td class="info">${data.R_LOW_C}</td></tr>
                            <tr><td class="title">최고 기온</td><td class="info">${data.R_HIGH_C}</td></tr>
                            <tr><td class="title">습도</td><td class="info">${data.R_HUM}</td></tr>
                            <tr><td class="title">병충해</td><td class="info">${data.R_BUG}</td></tr>
                            <tr><td class="title">방제 정보</td><td class="info">${data.R_DR_NUM}</td></tr>
                            <tr><td class="title">농약</td><td class="info">${data.R_PTC}</td></tr>
                            <tr><td class="title">비료</td><td class="info">${data.R_FTZ}</td></tr>
                            <tr><td class="title">작업내용</td><td class="info">${data.R_DIARY}</td></tr>
                            <tr><td colspan="2"><img src="${data.R_PIC1}" alt="저장 이미지" style="max-height: 400px; max-width: 350px;"></td></tr>
                        </table>
                        </div>`;

                        Le.innerHTML=(h_diary+"");
                    }
                },
                error : function() {
                }
            });
        });
    }
}