// const dashboard = document.querySelector('.dashboard');
// const aboutDiv = document.querySelector('.about');
const loginDiv = document.querySelector('.login');
// const signOutDiv = document.querySelector('.signOutDiv');
// const sideNavDiv = document.querySelector('.sidenav');
const dashboardDiv = document.querySelector('.dashboard-div');
const unitSwitch = document.getElementById('unit-switch');
const metric = document.getElementById('metric');
const imperial = document.getElementById('imperial');
const imperialHeightFt = document.getElementById('imperial-height-ft');
const imperialHeightIn = document.getElementById('imperial-height-in');
const imperialWeight = document.getElementById('imperial-weight');
const metricHeight = document.getElementById('metric-height');
const metricWeight = document.getElementById('metric-weight');

const loginUI = user => {
  if (user) {
    loginDiv.style.display = 'none';
    dashboardDiv.style.display = 'block';
    // loginDiv.style.hidden = true;
    // aboutDiv.style.display = 'block';
    // dashboard.style.display = 'block';
    // signOutDiv.style.display = 'block';
    // sideNavDiv.style.display = 'block';
    // dashboard.style.hidden = false;
  } else {
    loginDiv.style.display = 'block';
    dashboardDiv.style.display = 'none';
    // loginDiv.style.hidden = false;
    // aboutDiv.style.display = 'none';
    // dashboard.style.display = 'none';
    // signOutDiv.style.display = 'none';
    // sideNavDiv.style.display = 'none';
    // dashboard.style.hidden = true;
  }
};

document.addEventListener('DOMContentLoaded', function() {
  // ad financial info
  // const financialInfoForms = document.querySelectorAll('.side-menu');
  // M.Sidenav.init(menus, { edge: 'right' });
  // add recipe form
  const scheduleForms = document.querySelectorAll('.side-form');
  M.Sidenav.init(scheduleForms, { edge: 'left', closeOnClick: true });
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, {
    autoClose: true,
    disableDayFn: day => {
      return day.valueOf() > new Date().valueOf();
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.datepicker-add');
  var instances = M.Datepicker.init(elems, {
    autoClose: true,
    disableDayFn: day => {
      return day.valueOf() + 86400000 < new Date().valueOf();
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.timepicker-add');
  var instances = M.Timepicker.init(elems, {
    autoClose: true
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});
});

unitSwitch.addEventListener('click', e => {
  if (e.target.checked) {
    metric.style.display = 'block';
    imperial.style.display = 'none';
    metricHeight.required = true;
    metricWeight.required = true;
    imperialHeightFt.required = false;
    imperialHeightIn.required = false;
    imperialWeight.required = false;
  } else {
    metric.style.display = 'none';
    imperial.style.display = 'block';
    metricHeight.required = false;
    metricWeight.required = false;
    imperialHeightFt.required = true;
    imperialHeightIn.required = true;
    imperialWeight.required = true;
  }
});

const showDaysLived = time => {
  let birthday = moment(time);
  let today = moment();
  let livedYears = today.diff(birthday, 'years');
  birthday.add(livedYears, 'years');
  let livedMonths = today.diff(birthday, 'months');
  birthday.add(livedMonths, 'months');
  let livedWeeks = today.diff(birthday, 'weeks');
  birthday.add(livedWeeks, 'weeks');
  let livedDays = today.diff(birthday, 'days');
  birthday.add(livedDays, 'days');
  let daysLived = document.getElementById('days-lived');
  daysLived.innerHTML = `${livedYears}yr ${livedMonths}mo ${livedWeeks}wk ${livedDays}day`;
};

const showDaysWillLive = (time, birthday) => {
  let today = moment();
  let expectedDays = moment.duration(time, 'years').asDays();
  let expected = moment(birthday).add(expectedDays, 'days');
  let livedYears = expected.diff(today, 'years');
  today.add(livedYears, 'years');
  let livedMonths = expected.diff(today, 'months');
  today.add(livedMonths, 'months');
  let livedWeeks = expected.diff(today, 'weeks');
  today.add(livedWeeks, 'weeks');
  let livedDays = expected.diff(today, 'days');
  today.add(livedDays, 'days');
  let daysWillLive = document.getElementById('days-will-live');
  daysWillLive.innerHTML = `${livedYears}yr ${livedMonths}mo ${livedWeeks}wk ${livedDays}day`;
};

const showDiff = () => {
  let now = moment([]);
  let endOfYear = moment().endOf('year');
  let endOfWeek = moment().endOf('isoWeek');

  let weeks = endOfYear.diff(now, 'weeks');
  let days = endOfWeek.diff(now, 'days');

  let weeksLeft = document.getElementById('weeks-left');
  let daysLeft = document.getElementById('days-left');

  weeksLeft.innerHTML = weeks;
  daysLeft.innerHTML = days;
};

const showTimeInfo = () => {
  let now = moment([]);
  let endOfDay = moment().endOf('day');
  let duration = moment.duration(endOfDay.diff(now));

  let hours = duration.hours();
  duration.subtract(moment.duration(hours, 'hours'));
  let minutes = duration.minutes();
  duration.subtract(moment.duration(minutes, 'minutes'));
  let seconds = duration.seconds();
  duration.subtract(moment.duration(seconds, 'seconds'));
  let milliseconds = duration.milliseconds();
  duration.subtract(moment.duration(milliseconds, 'milliseconds'));

  const hrLeft = document.getElementById('hr-left');
  const minLeft = document.getElementById('min-left');
  const secLeft = document.getElementById('sec-left');
  const milsecLeft = document.getElementById('milsec-left');
  // timeLeft.innerHTML = `${hours}' ${minutes}" ${seconds} ${milliseconds}`;
  hrLeft.innerHTML = hours;
  minLeft.innerHTML = minutes;
  secLeft.innerHTML = seconds;
  // milsecLeft.innerHTML = milliseconds;
};

const renderDashboard = data => {
  const totalTime = document.getElementById('total-time');
  const lifeBar = document.getElementsByClassName('life-bar-fill')[0];
  const lifePercentage = document.getElementsByClassName('life-bar-value')[0];
  const today = moment([]);
  const dateOfBirth = moment(data.date_of_birth);
  const total = moment(data.life_expectancy);
  const age = today.diff(dateOfBirth, 'years', true);
  const percentage = Math.floor((age / total) * 100 + 0.5);

  totalTime.innerHTML = Math.floor(data.life_expectancy) + ' years';

  const id = setInterval(frame, 10);
  let width = 10;
  function frame() {
    if (width >= percentage) {
      clearInterval(id);
    } else {
      width++;
      lifeBar.style.width = width + '%';
      lifePercentage.innerHTML = width * 1 + '% lived';
    }
  }

  const currentYear = document.getElementById('current-year');
  const now = new Date();
  const yearNum = now.getFullYear() + 1;
  currentYear.innerHTML = yearNum;

  // const today = moment([]);
  // const dateOfBirth = moment(data.date_of_birth);
  // const total = moment(data.life_expectancy);
  // const age = today.diff(dateOfBirth, 'years', true);
  // console.log('current and percentage', age);
  // setInterval((age, total) => {
  //   let percentage = Math.floor((age / total) * 100 + 0.5);

  //   lifeBar.style.setProperty('--width', width + 0.1);
  // }, 5);

  // Chart.defaults.global.defaultFontColor = 'red';
  // Chart.defaults.global.defaultFontFamily = 'Montserrat';
  // Chart.defaults.global.defaultFontSize = 24;

  // var ctx = document.getElementById('myChart').getContext('2d');
  // var myChart = new Chart(ctx, {
  //   type: 'doughnut',
  //   data: {
  //     labels: [],
  //     datasets: [
  //       {
  //         label: 'Life expectancy',
  //         data: [25, data.life_expectancy - 25],
  //         backgroundColor: [
  //           '#ff9800',
  //           '#fff',
  //           'rgba(255, 206, 86, 1)',
  //           'rgba(75, 192, 192, 1)',
  //           'rgba(153, 102, 255, 1)',
  //           'rgba(255, 159, 64, 1)'
  //         ],
  //         borderColor: ['#ff9800', '#ff9800', '#ff9800', '#ff9800', '#ff9800'],
  //         borderWidth: 2
  //       }
  //     ]
  //   },
  //   options: {
  //     rotation: 1 * Math.PI,
  //     circumference: 1 * Math.PI,
  //     responsive: true,
  //     legend: {
  //       position: 'bottom'
  //     },
  //     title: {
  //       display: true,
  //       text: 'Life expected: ' + data.life_expectancy + ' yrs'
  //     },
  //     animation: {
  //       animateScale: true,
  //       animateRotate: true
  //     },

  //     tooltips: {
  //       callbacks: {
  //         label: function(tooltipItem, data) {
  //           var dataset = data.datasets[tooltipItem.datasetIndex];
  //           var total = dataset.data.reduce(function(
  //             previousValue,
  //             currentValue,
  //             currentIndex,
  //             array
  //           ) {
  //             return previousValue + currentValue;
  //           });
  //           var currentValue = dataset.data[tooltipItem.index];
  //           var percentage = Math.floor((currentValue / total) * 100 + 0.5);
  //           return percentage + '%';
  //         }
  //       }
  //     }
  //   }
  // });

  // //Plugin for center text
  // Chart.pluginService.register({
  //   beforeDraw: function(chart) {
  //     var width = chart.chart.width,
  //       height = chart.chart.height,
  //       ctx = chart.chart.ctx;
  //     ctx.restore();
  //     var fontSize = (height / 100).toFixed(2);
  //     ctx.font = fontSize + 'em sans-serif';
  //     ctx.textBaseline = 'top';
  //     var text = Math.floor((25 / data.life_expectancy) * 100 + 0.5) + '%',
  //       textX = Math.round((width - ctx.measureText(text).width) / 2),
  //       textY = height / 1.35;
  //     ctx.fillText(text, textX, textY);
  //     ctx.save();
  //   }
  // });

  showDaysLived(data.date_of_birth);
  showDaysWillLive(data.life_expectancy, data.date_of_birth);
};
setInterval(showDiff, 1000);
setInterval(showTimeInfo, 1000);

const createAbout = () => {
  console.log('create about');
  var elem = document.getElementById('modal1');
  var instance = M.Modal.init(elem, { dismissible: false });
  console.log('modal open');
  instance.open();
};

const closeModal = () => {
  var elem = document.getElementById('modal1');
  var instance = M.Modal.init(elem, { dismissible: false });
  instance.close();
};

// render schedule
const schedules = document.querySelector('.schedules');
const renderSchedule = (data, id) => {
  return new Promise(resolve => {
    const scheduleFrom = data.from;
    const formattedFrom = moment(scheduleFrom).format('MMM. DD, YYYY, hh:mm a');
    const scheduleTo = data.to;
    const formattedTo = moment(scheduleTo).format('MMM. DD, YYYY, hh:mm a');
    let html = `
    <div class="col s12 m12 l6 added-schedule">
      <div class="card-panel schedule white" data-id="${id}">
        <div class="schedule-details">
          <div class="schedule-desc">${data.title}</div>
          <div class="schedule-from">${formattedFrom}</div>
          <div class="schedule-to">${formattedTo}</div>
        </div>
        <!-- <div class="schedule-countdown">agddas</div> --!>
        <div class="schedule-delete">
          <i class="material-icons" data-id="${id}">delete_outline</i>
        </div>
      </div>
    </div>
    `;
    resolve((schedules.innerHTML += html));
  });
};

// remove schedule from DOM
const removeSchedule = id => {
  const schedule = document.querySelector(`.schedule[data-id = ${id}]`);
  schedule.remove();
};
