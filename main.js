const form = document.querySelector("form");
var submitBtn = document.getElementById("submit-btn");
const addBtn = document.getElementById("add-btn");
const removeBtn = document.getElementById("remove-btn");
const colorBtn = document.getElementById('color-btn')
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

strokeColor = 'blue'

// //remove the input at that index
// removeBtn.addEventListener("click", (e) => {
//   var inputs = document.querySelectorAll("label");
//   const index = document.getElementById("remove-index").value;
//   if (index >= inputs.length || index < 0) {
//     return;
//   }
//   inputs[index].remove();
// });

colorBtn.addEventListener('click', (e) => {
    bg = document.getElementById('bg-color')
    fg = document.getElementById('fg-color')

    canvas.style.backgroundColor = bg.value;
    strokeColor = fg.value

    //re-render the canvas
    submitBtn.click()
})

submitBtn.addEventListener("click", function() {
    const datas = document.querySelectorAll("form input");
    const data = [];
    for (let i = 0; i < datas.length; i++) {
        console.log(datas[i].value);
        data.push(datas[i].value);
    }

    drawChart(data);
});

addBtn.addEventListener("click", function(e) {
    const input = document.createElement("input");
    const datas = document.querySelectorAll("form input");

    input.setAttribute("type", "text");
    const labeled = document.createElement("label");
    labeled.appendChild(document.createTextNode(`Data ${datas.length + 1} `));
    labeled.appendChild(input);

    form.appendChild(labeled);
});

function drawChart(data) {
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //get the thickness of the chart by ratio of the data in the chart
    const width = parseInt(canvas.width / data.length - 5);
    console.log(width, "width", canvas.height, canvas.width);

    for (var i = 0; i < data.length; i++) {
        if (!isNaN(data[i]) && data[i] !== "") {
            console.log(data[i], data);
            ctx.fillStyle = strokeColor
            ctx.fillRect(i * width, canvas.height - data[i], width / 2, data[i]);

            // Add label
            ctx.fillStyle = strokeColor;
            ctx.fillText(data[i], i * width, canvas.height - data[i] - 10, width / 2);
        }
    }
}

var clearBtn = document.getElementById("clear-btn");

clearBtn.addEventListener("click", function() {
    const inputs = document.querySelectorAll("label");
    for (let i = 0; i < inputs.length; i++) {
        form.removeChild(inputs[i]);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

var downloadBtn = document.getElementById("download-btn");

downloadBtn.addEventListener("click", function() {
    var dataURL = canvas.toDataURL("image/png");
    downloadBtn.href = dataURL;
});