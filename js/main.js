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
})

// chart colors
var colors = ['#043353', '#bc2c3d'];

/* line chart 1 */
var chLine = document.getElementById("chLine");
var chartData = {
    labels: ["Jan 20", "Jan 28", "Feb 03", "Feb 09", "Feb 15", "Feb 22", "Feb 27", "Mar 04", "Mar 10", " Mar 16", "Mar 22", "Mar 25"],
    datasets: [{
        data: [282, 4593, 17391, 40000, 67000, 76288, 82000, 95000, 118000, 167511, 335000, 413433],

        backgroundColor: 'transparent',
        borderColor: colors[0],
        borderWidth: 4,
        pointBackgroundColor: colors[0]
    }]
};
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

// line chart 2
chLine = document.getElementById("chLinee");
chartData = {
    labels: ["Jan 20", "Jan 28", "Feb 03", "Feb 09", "Feb 15", "Feb 22", "Feb 27", "Mar 04", "Mar 10", " Mar 16", "Mar 22", "Mar 25"],
    datasets: [
        {
            data: [6, 362, 813, 1526, 2359, 2804, 3198, 4012, 6606, 12783, 18433],
            backgroundColor: colors[3],
            borderColor: colors[1],
            borderWidth: 4,
            pointBackgroundColor: colors[1]
        }]
};
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

