// Google all the events functions => MDN

let isPenDown = false;
let undoArr = [];
let redoArr = [];

// 1) press Mouse
board.addEventListener("mousedown", function (e) {
  // e is an onject recieved after calling
  // begin Path
  context.beginPath();
  // Move to mouse pointers location
  let x = e.clientX;
  let y = e.clientY;
  let top = getLocation();
  y = Number(y) - top; // To manage relative height
  context.moveTo(x, y);
  console.log("Mouse Down Called");
  isPenDown = true;

  //Mouse Down ppsition saved
  let mdPoint = {
    x,
    y,
    id: "md",
    color: context.strokeStyle,
    width: context.lineWidth
  }
  undoArr.push(mdPoint);

});

// 2) On Move
board.addEventListener("mousemove", function (e) {
  if (isPenDown) {
    // console.log("Mouse Move Called");
    // lineTo
    let x = e.clientX;
    let y = e.clientY;
    let top = getLocation();
    y = Number(y) - top; // To manage relative height
    context.lineTo(x, y);

    // Stroke
    context.stroke();

    // Mpuse Move point saved
    let mmPoint = {
      x,
      y,
      id: "mm",
      color: context.strokeStyle,
      width: context.lineWidth
    }
    undoArr.push(mmPoint);
  }
});
// 3) Close Path

// board.addEventListener("mouseleave", function (e) {
//   isPenDown = false;
// });

window.addEventListener("mouseup", function () {
  // close path
  // context.closePath();  //No Need
  console.log("Mouse Up Called");
  isPenDown = false;
});


function getLocation () {
  let { top } = board.getBoundingClientRect(); // get relative height
  return top;
}

function undoLast () {
  //  pop the last point
  if (undoArr.length >= 2) {
    //  lines 
    //console.log(undoArr);
    let tempArr = []
    for (let i = undoArr.length - 1; i >= 0; i--) {

      //console.log(undoArr[i]);
      let id = undoArr[i].id;
      if (id == "md") {
        tempArr.unshift(undoArr.pop());
        break;
      }
      else {
        // undoArr.pop();
        tempArr.unshift(undoArr.pop());
      }
    }
    redoArr.push(tempArr);
    //  clear canvas=> 
    context.clearRect(0, 0, board.width, board.height);
    // redraw
    reDraw();
  }
}

function redoLast () {
  if (redoArr.length > 0) {
    //  lines 
    let undoPath = redoArr.pop();
    for (let i = 0; i < undoPath.length; i++) {
      undoArr.push(undoPath[i]);
    }
    //  clear canvas=> 
    context.clearRect(0, 0, board.width, board.height);
    // redraw
    reDraw();
  }
}
function reDraw () {
  for (let i = 0; i < undoArr.length; i++) {
    let { x, y, id, color, width } = undoArr[i];
    context.strokeStyle = color;
    context.width = width;

    if (id == "md") {
      context.beginPath();
      context.moveTo(x, y);
    }

    else if (id == "mm") {
      context.lineTo(x, y);
      context.stroke();
    }
  }
}


