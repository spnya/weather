async function get_day(time) {
    var gg = 0
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = await async function() {
        if (this.readyState == 4 && this.status == 200) {
            var res = await JSON.parse(xhttp.responseText);

            if (res.success) {
              console.log(res)
              let a1 = []
              for (i in res.data) {
                await a1.push(parseInt(i)+1)
              }
              console.log(a1)
              console.log(res.data)
              render_weeks(res.data)
              render_mouths(res.data)

              var data = await {
                labels: a1,
                label: "Дни",
                datasets: [{
                  backgroundColor: "rgba(255,99,132,0.2)",
                  borderColor: "rgba(255,99,132,1)",
                  borderWidth: 2,
                  hoverBackgroundColor: "rgba(255,99,132,0.4)",
                  hoverBorderColor: "rgba(255,99,132,1)",
                  data: res.data,
                }]
              };

              var options = await {
                maintainAspectRatio: false,
                scales: {
                  yAxes: [{
                    stacked: true,
                    gridLines: {
                      display: true,
                      color: "rgba(255,99,132,0.2)"
                    }
                  }],
                  xAxes: [{
                    gridLines: {
                      display: false
                    }
                  }]
                }
              };

              Chart.Bar('chart-1', {
                options: options,
                data: data
              });
              
            } else {

            }
        }
    };
    xhttp.open("POST", "/api/public/get_day", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify({
      city_name: document.getElementById("city_choice").value,
      timestamp: time
    }));
}

async function render_weeks(data) {
  let new_data = []
  so_far = 0;
  n = 0
  for (let i = 1; i < data.length; i++) {
      so_far += parseFloat(data[i])
      if (i % 7 == 0) {
        new_data.push(so_far/7);
        n += 1;
        so_far = 0 
      }
  }
  let a1 = []
  for (i in new_data) {
    await a1.push(parseInt(i)+1)
  }
  var data = await {
    labels: a1,
    label: "Недели",
    datasets: [{
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 2,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: new_data,
    }]
  };

  var options = await {
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        stacked: true,
        gridLines: {
          display: true,
          color: "rgba(255,99,132,0.2)"
        }
      }],
      xAxes: [{
        gridLines: {
          display: false
        }
      }]
    }
  };

  Chart.Bar('chart-2', {
    options: options,
    data: data
  });
  
}

async function render_mouths(data) {
  let new_data = []
  so_far = 0;
  n = 0
  for (let i = 1; i < data.length; i++) {
      so_far += parseFloat(data[i])
      if (i % 30 == 0) {
        new_data.push(so_far/30);
        n += 1;
        so_far = 0 
      }
  }
  let a1 = []
  for (i in new_data) {
    await a1.push(parseInt(i)+1)
  }
  var data = await {
    labels: a1,
    label: "Месяца",
    datasets: [{
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 2,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: new_data,
    }]
  };

  var options = await {
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        stacked: true,
        gridLines: {
          display: true,
          color: "rgba(255,99,132,0.2)"
        }
      }],
      xAxes: [{
        gridLines: {
          display: false
        }
      }]
    }
  };

  Chart.Bar('chart-3', {
    options: options,
    data: data
  });
  
}
function get_weather() {
  get_day(new Date().valueOf())
}


/*

var data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [{
    backgroundColor: "rgba(255,99,132,0.2)",
    borderColor: "rgba(255,99,132,1)",
    borderWidth: 2,
    hoverBackgroundColor: "rgba(255,99,132,0.4)",
    hoverBorderColor: "rgba(255,99,132,1)",
    data: [65, 59, 20, 81, 56, 55, 40,65, 59, 20, 81, 56, 55, 40,65, 59, 20, 81, 56, 55, 40,65, 59, 20, 81, 56, 55, 40,65, 59, 20, 81, 56, 55, 40,65, 59, 20, 81, 56, 55, 40,65, 59, 20, 81, 56, 55, 40,65, 59, 20, 81, 56, 55, 40,65, 59, 20, 81, 56, 55, 40],
  }]
};

var options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      stacked: true,
      gridLines: {
        display: true,
        color: "rgba(255,99,132,0.2)"
      }
    }],
    xAxes: [{
      gridLines: {
        display: false
      }
    }]
  }
};

Chart.Bar('chart-1', {
  options: options,
  data: data
});

Chart.Bar('chart-2', {
  options: options,
  data: data
});

Chart.Bar('chart-3', {
  options: options,
  data: data
});

*/