let subtitle = document.querySelector(".subtitle");
let graphTitle = document.querySelector(".graph-title");

let populationBtn = document.querySelector(".population");
let languagesBtn = document.querySelector(".languages");

let container1 = document.querySelector(".container1");
let container2 = document.querySelector(".container2");


subtitle.textContent = `Currently, we have ${countries_data.length} countries`;
graphTitle.textContent = `10 Most populated countries in the world`;

let populationsArr = [];
let sumArr = [];
for (let i = 0; i < countries_data.length; i++) {
  sumArr.push(countries_data[i].population);
  populationsArr.push([countries_data[i].name, countries_data[i].population]);
}

let sum = 0;
for (let i = 0; i < sumArr.length; i++) {
  sum += sumArr[i];
}

//Get the 10 most populated countries
let sortedArr = [];
sortedArr = populationsArr.sort((a, b) => b[1] - a[1]).slice(0, 10);
const arr2 = ["World", sum];
sortedArr.unshift(arr2);


let countries = [];
let countriesPop = [];

for (let i = 0; i < sortedArr.length; i++) {
  countries.push(sortedArr[i][0]);
  countriesPop.push(sortedArr[i][1]);
}


//Get the 10 most spoken languages
let languagesCount = {};
let languagesArr = [];
for (let i = 0; i < countries_data.length; i++) {
  languagesArr.push(countries_data[i].languages);
}

for (let i = 0; i < languagesArr.length; i++) {
  let outerArray = languagesArr[i];
  for (let j = 0; j < outerArray.length; j++) {
    let nestedArray = outerArray[j];
    if (languagesCount[nestedArray]) {
      languagesCount[nestedArray]++;
    } else {
      languagesCount[nestedArray] = 1;
    }
  }
}


const sortedLanguages = Object.keys(languagesCount)
  .sort((a, b) => languagesCount[b] - languagesCount[a])
  .slice(0, 10);

const sortedCounts = Object.values(languagesCount)
  .sort((a, b) => b - a)
  .slice(0, 10);

let resultArr = [];
sortedLanguages.forEach((language) => {
  const obj = {
    [language]: languagesCount[language],
  };
  resultArr.push(obj);
});


//Container 1
let ctx = document.getElementById("myChart").getContext("2d");
let myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: countries,
    datasets: [
      {
        label: "",
        data: countriesPop,
        backgroundColor: "#f2a71b",
        borderWidth: 1,
      },
    ],
  },

  options: {
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          font: {
            weight: "600",
            size: "15",
          },
        },
      },
      y: {
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          beginAtZero: true,

          font: {
            weight: "400",
            size: "15",
          },
        },
      },
    },
    indexAxis: "y",
  },
});

//Container 2
let secondChart = document.getElementById("languagesChart").getContext("2d");
let languagesChart = new Chart(secondChart, {
  type: "bar",
  data: {
    labels: sortedLanguages,
    datasets: [
      {
        label: "",
        data: sortedCounts,
        backgroundColor: "#f2a71b",
        borderWidth: 1,
      },
    ],
  },

  options: {
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          font: {
            weight: "600",
            size: "15",
          },
        },
      },
      y: {
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          beginAtZero: true,

          font: {
            weight: "400",
            size: "15",
          },
        },
      },
    },
    indexAxis: "y",
  },
});



window.addEventListener("load", function () {
  container1.style.display = "block";
  container2.style.display = "none";
});

populationBtn.addEventListener("click", () => {
  container1.style.display = "block";
  container2.style.display = "none";
  graphTitle.textContent = `10 Most populated countries in the world`;
  graphTitle.style.backgroundColor = "white";
});

languagesBtn.addEventListener("click", () => {
  container2.style.display = "block";
  container1.style.display = "none";
  graphTitle.textContent = `10 Most Spoken languages in the world`;
  graphTitle.style.backgroundColor = "white";
});

