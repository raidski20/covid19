var days = [];
var cases_over_days = [];
var deaths_over_days = [];
$(function() {
    "use strict";
    var e = $(window).height(),
        a = $(".navbar").innerHeight();
    $(".slider, .carousel-item").height(e - a), $(".navbar-nav li a").click(function() {
        $("html, body").animate({
            scrollTop: $("#" + $(this).data("value")).offset().top
        }, 1e3)
    });
    var t = $("#scroll-Button");
    $(window).scroll(function() {
        $(window).scrollTop() > 200 ? t.addClass("show") : t.removeClass("show")
    }), t.on("click", function(e) {
        e.preventDefault(), $("html, body").animate({
            scrollTop: 0
        }, "300")
    }), $.ajax({
        url: "https://corona.lmao.ninja/v2/all",
        dataType: "json",
        cache: !1,
        success: function(e, a) {
            $("#total_cases").html(e.cases), $("#total_deaths, #fourthS").html(e.deaths), $("#total_recovered, #thirdS").html(e.recovered), $("#active_cases").html(e.active);
            var t = new Date(e.updated).toLocaleTimeString();
            $("#last_update").html("last updated: " + t + "."), $("#closed-cases").html(e.deaths + e.recovered), $("#recov-pers").html("(" + (100 * e.recovered / (e.deaths + e.recovered)).toFixed(1) + "%)"), $("#deathss-pers").html("(" + (100 * e.deaths / (e.deaths + e.recovered)).toFixed(1) + "%)"), $("#firstS").html(e.active - e.critical), $("#secondS").html(e.critical), $("#good-cases").html("(" + (100 * (e.active - e.critical) / e.active).toFixed(1) + "%)"), $("#serious-cases").html("(" + (100 * e.critical / e.active).toFixed(1) + "%)")
        },
        error: function(e, a, t) {
            console.log(e), console.log(a), console.log(t)
        }
    })
    $.ajax({
        async: !1,
        url: 'https://covid19.mathdro.id/api/daily/',
        dataType: 'json',
        cache: !1,
        success: function(e, status) {
            for (var i in e) {
                days.push(e[i].reportDate);
                cases_over_days.push(e[i].totalConfirmed)
                deaths_over_days.push(e[i].deaths.total)
            }
        },
        error: function(xhr, textStatus, err) {
            console.log(xhr);
            console.log(textStatus);
            console.log(err)
        }
    })
    var colors = ['#043353', '#bc2c3d'];
    var chart_ids = ["chLine", "chLinee"];
    for (var i = 0; i < chart_ids.length; i++) {
        var chLine = document.getElementById(chart_ids[i]);
        switch (i) {
            case 0:
                var chartData = {
                    labels: days,
                    datasets: [{
                        data: cases_over_days,
                        borderColor: colors[i],
                        borderWidth: 4,
                    }]
                };
                break;
            case 1:
                chartData = {
                    labels: days,
                    datasets: [{
                        data: deaths_over_days,
                        borderColor: colors[i],
                        borderWidth: 4,
                    }]
                };
                break
        }
        if (chLine) {
            new Chart(chLine, {
                type: 'line',
                data: chartData,
                options: {
                    scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero: !1
                            }
                        }]
                    },
                    legend: {
                        display: !1
                    },
                    responsive: !0
                }
            })
        }
    }
}), anime({
    targets: ".navbar .navbar-brand img, .footer h2 img",
    loop: !0,
    rotate: {
        value: 360,
        duration: 1800,
        easing: "easeInOutSine"
    },
    delay: 250
})