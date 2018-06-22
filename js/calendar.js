/**
 * 完整代码
 */

let months;
let nextMonths;
let month;
let year;
let nextYear;
// 关于月份： 在设置时要-1，使用时要+1
$(function () {

    $('#calendar').calendar({
        ifSwitch: true, // 是否切换月份
        hoverDate: true, // hover是否显示当天信息
        backToday: true // 是否返回当天
    });

});

;(function ($, window, document, undefined) {

    let Calendar = function (elem, options) {
        this.$calendar = elem;

        this.defaults = {
            ifSwitch: true,
            hoverDate: false,
            backToday: false
        };

        this.opts = $.extend({}, this.defaults, options);

        // console.log(this.opts);
    };

    Calendar.prototype = {
        showHoverInfo: function (obj) { // hover 时显示当天信息
            let _dateStr = $(obj).attr('data');
            let offset_t = $(obj).offset().top + (this.$calendar_today.height() - $(obj).height()) / 2;
            let offset_l = $(obj).offset().left + $(obj).width();
            let changeStr = addMark(_dateStr);
            let _week = changingStr(changeStr).getDay();
            let _weekStr = '';

            // this.$calendar_today.show();

            this.$calendar_today
                .css({left: offset_l + 30, top: offset_t})
                .stop()
                .animate({left: offset_l + 16, top: offset_t});

            switch (_week) {
                case 0:
                    _weekStr = 'Sunday';
                    break;
                case 1:
                    _weekStr = 'Monday';
                    break;
                case 2:
                    _weekStr = 'Tuesday';
                    break;
                case 3:
                    _weekStr = 'Wednesday';
                    break;
                case 4:
                    _weekStr = 'Thursday';
                    break;
                case 5:
                    _weekStr = 'Friday';
                    break;
                case 6:
                    _weekStr = 'Saturday';
                    break;
            }

            this.$calendarToday_date.text(changeStr);
            this.$calendarToday_week.text(_weekStr);
        },

        showCalendar: function () { // 输入数据并显示
            let self = this;
            year = dateObj.getDate().getFullYear();
            month = dateObj.getDate().getMonth() + 1;
            let dateStr = returnDateStr(dateObj.getDate());
            let firstDay = new Date(year, month - 1, 1); // 当前月的第一天
            switch (month) {
                case 1:
                    months = '一月';
                    nextMonths = '二月';
                    break;
                case 2:
                    months = '二月';
                    nextMonths = '三月';
                    break;
                case 3:
                    months = '三月';
                    nextMonths = '四月';
                    break;
                case 4:
                    months = '四月';
                    nextMonths = '五月';
                    break;
                case 5:
                    months = '五月';
                    nextMonths = '六月';
                    break;
                case 6:
                    months = '六月';
                    nextMonths = '七月';
                    break;
                case 7:
                    months = '七月';
                    nextMonths = '八月';
                    break;
                case 8:
                    months = '八月';
                    nextMonths = '九月';
                    break;
                case 9:
                    months = '九月';
                    nextMonths = '十月';
                    break;
                case 10:
                    months = '十月';
                    nextMonths = '十一月';
                    break;
                case 11:
                    months = '十一月';
                    nextMonths = '十二月';
                    break;
                case 12:
                    months = '十二月';
                    nextMonths = '一月';
                    break;
            }


            // 渲染标题
            this.$calendarTitle_text.text(months + '，' + year);
            nextYear = year;
            console.log(month);
            if (month === 12) {
                nextYear = year + 1;
            }

            $(".arrow").text(nextMonths + '，' + nextYear);


            this.$calendarDate_item.each(function (i) {
                // allDay: 得到当前列表显示的所有天数
                let allDay = new Date(year, month - 1, i + 1 - firstDay.getDay());
                let allDay_str = returnDateStr(allDay);

                $(this).text(allDay.getDate()).attr('data', allDay_str);

                if (returnDateStr(new Date()) === allDay_str) {
                    $(this).attr('class', 'item item-curDay');
                } else if (returnDateStr(firstDay).substr(0, 6) === allDay_str.substr(0, 6)) {
                    $(this).attr('class', 'item item-curMonth');
                } else {
                    $(this).attr('class', 'item');
                }
            });

            // 已选择的情况下，切换日期也不会改变
            if (self.selected_data) {
                let selected_elem = self.$calendar_date.find('[data=' + self.selected_data + ']');

                selected_elem.addClass('item-selected');
            }
        },

        renderDOM: function () { // 渲染DOM
            this.$calendar_title = $('<div class="calendar-title"></div>');
            this.$calendar_week = $('<ul class="calendar-week"></ul>');
            this.$calendar_date = $('<ul class="calendar-date"></ul>');
            this.$calendar_today = $('<div class="calendar-today"></div>');


            let _titleStr = '<a href="#" class="title"></a>' +
                '<div class="arrow"></div>';
            let _weekStr = '<li class="item">日</li>' +
                '<li class="item">一</li>' +
                '<li class="item">二</li>' +
                '<li class="item">三</li>' +
                '<li class="item">四</li>' +
                '<li class="item">五</li>' +
                '<li class="item">六</li>';
            let _dateStr = '';
            let _dayStr = '<i class="triangle"></i>' +
                '<p class="date"></p>' +
                '<p class="week"></p>';

            for (let i = 0; i < 6; i++) {
                _dateStr += '<li class="item">26</li>' +
                    '<li class="item">26</li>' +
                    '<li class="item">26</li>' +
                    '<li class="item">26</li>' +
                    '<li class="item">26</li>' +
                    '<li class="item">26</li>' +
                    '<li class="item">26</li>';
            }

            this.$calendar_title.html(_titleStr);
            this.$calendar_week.html(_weekStr);
            this.$calendar_date.html(_dateStr);
            this.$calendar_today.html(_dayStr);

            this.$calendar.append(this.$calendar_title, this.$calendar_week, this.$calendar_date, this.$calendar_today);
            this.$calendar.show();
        },

        inital: function () { // 初始化
            let self = this;

            this.renderDOM();

            this.$calendarTitle_text = this.$calendar_title.find('.title');
            this.$backToday = $('#backToday');
            this.$arrow_prev = this.$calendar_title.find('.arrow-prev');
            this.$arrow_next = this.$calendar_title.find('.arrow-next');
            this.$calendarDate_item = this.$calendar_date.find('.item');
            this.$calendarToday_date = this.$calendar_today.find('.date');
            this.$calendarToday_week = this.$calendar_today.find('.week');

            this.selected_data = 0;

            this.showCalendar();

            // 事件
            let start;
            let end;
            let arrow = document.querySelector("#calendar");
            arrow.addEventListener('touchstart', function (event) {
                start = event.touches[0].clientX;
            });
            arrow.addEventListener("touchend", function (event) {
                end = event.changedTouches[0].clientX;

                if (end < start) {
                    month = month + 1;
                    if (month === 13) {
                        month = 1;
                    }
                    if (month === 12) {
                        year = year + 1;
                    }
                    console.log(nextYear);
                    let _date = dateObj.getDate();
                    dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() + 1, 1));
                    self.showCalendar();
                }
                if (end > start) {
                    month = month - 1;
                    if (month === 0) {
                        month = 12;
                    }
                    if (month === 11) {
                        year = year - 1;

                    }
                    let _date = dateObj.getDate();
                    dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() - 1, 1));
                    self.showCalendar();
                }
            });


            if (this.opts.backToday) {
                let cur_month = dateObj.getDate().getMonth() + 1;

                this.$backToday.bind('click', function () {
                    let item_month = $('.item-curMonth').eq(0).attr('data').substr(4, 2);
                    let if_lastDay = (item_month != cur_month) ? true : false;

                    if (!self.$calendarDate_item.hasClass('item-curDay') || if_lastDay) {
                        dateObj.setDate(new Date());

                        self.showCalendar();
                    }
                });
            }

            this.$calendarDate_item.hover(function () {
                self.showHoverInfo($(this));
            }, function () {
                self.$calendar_today.css({left: 0, top: 0}).hide();
            });

            this.$calendarDate_item.click(function () {
                let _dateStr = $(this).attr('data');
                let _date = changingStr(addMark(_dateStr));
                let $curClick = null;

                self.selected_data = $(this).attr('data');

                dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth(), 1));

                if (!$(this).hasClass('item-curMonth')) {
                    self.showCalendar();
                }

                $curClick = self.$calendar_date.find('[data=' + _dateStr + ']');
                $curDay = self.$calendar_date.find('.item-curDay');
                if (!$curClick.hasClass('item-selected')) {
                    self.$calendarDate_item.removeClass('item-selected');

                    $curClick.addClass('item-selected');
                }
            });
        },

        constructor: Calendar
    };

    $.fn.calendar = function (options) {
        let calendar = new Calendar(this, options);

        return calendar.inital();
    };


    // ========== 使用到的方法 ==========

    let dateObj = (function () {
        let _date = new Date();

        return {
            getDate: function () {
                return _date;
            },

            setDate: function (date) {
                _date = date;
            }
        }
    })();

    function returnDateStr(date) { // 日期转字符串
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month <= 9 ? ('0' + month) : ('' + month);
        day = day <= 9 ? ('0' + day) : ('' + day);

        return year + month + day;
    };

    function changingStr(fDate) { // 字符串转日期
        let fullDate = fDate.split("-");

        return new Date(fullDate[0], fullDate[1] - 1, fullDate[2]);
    };

    function addMark(dateStr) { // 给传进来的日期字符串加-
        return dateStr.substr(0, 4) + '-' + dateStr.substr(4, 2) + '-' + dateStr.substring(6);
    };

    // 条件1：年份必须要能被4整除
    // 条件2：年份不能是整百数
    // 条件3：年份是400的倍数
    function isLeapYear(year) { // 判断闰年
        return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
    }

})(jQuery, window, document);






