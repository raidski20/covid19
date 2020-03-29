$(function () {
    'use strict';
    // set the height of header's slider
    var windowHeight = $(window).height(),
        navH = $('.navbar').innerHeight();
    $('.slider, .carousel-item').height(windowHeight - navH);

    // smooth scroll to the desired div
    $('.navbar-nav li a').click(function () {
        $('html, body').animate({
            scrollTop: $('#' + $(this).data('value')).offset().top
        }, 1000);
    });

    // start of scroll to top button
    var btn = $('#scroll-Button');
    $(window).scroll(function() {
    if ($(window).scrollTop() > 200) {
        btn.addClass('show');
    } 
    else 
    {
        btn.removeClass('show');
    }
    });

    btn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '300');
    });
    // end of scroll to top button

    // getting data about covid cases and didplay it
    $.ajax({
        url: 'https://corona.lmao.ninja/all',
        dataType: 'json',
        cache: false,
        success: function (data, status) {
            $.each(data, function(index) {
                $("#total_cases").html(data.cases);
                $("#total_deaths").html(data.deaths);
                $("#total_recovered").html(data.recovered);
                var date = new Date(data.updated)
                console.log(date.toString())
                $("#last_update").html('last updated: ' + date + ".");
            })
        },
        error: function (xhr, textStatus, err) {
            console.log(xhr);
            console.log(textStatus);
            console.log(err);
        }

    })
})

// start of corona virus animation
anime({
    targets: '.navbar .navbar-brand img',
    loop: true,
    rotate: {
        value: 360,
        duration: 1800,
        easing: 'easeInOutSine',
    },
    delay: 250
});

// end of corona virus animation

// start of drawing charts
var colors = ['#043353', '#bc2c3d'];
var days = ["Jan 20", "Jan 28", "Feb 03", "Feb 09", "Feb 15", "Feb 22", "Feb 27", "Mar 04", "Mar 10", " Mar 16", "Mar 22", "Mar 25"];
var chart_ids = ["chLine", "chLinee"];

for (var i = 0; i < chart_ids.length; i++) {
    var chLine = document.getElementById(chart_ids[i]);
    switch (i) {
        case 0:
            var chartData = {
                labels: days,
                datasets:
                    [{
                        data: [282, 4593, 17391, 40000, 67000, 76288, 82000, 95000, 118000, 167511, 335000, 413433],
                        borderColor: colors[i],
                        borderWidth: 4,
                    }]
            };
            break;

        case 1:
            chartData = {
                labels: days,
                datasets:
                    [{
                        data: [6, 362, 813, 1526, 2359, 2804, 3198, 4012, 6606, 12783, 18433, 23495],
                        borderColor: colors[i],
                        borderWidth: 4,
                    }]
            };
            break;
    }

    if (chLine) {
        new Chart(chLine, {
            type: 'line',
            data: chartData,
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                },
                legend: {
                    display: false
                },
                responsive: true
            }
        });
    }
}
// end of drawing charts