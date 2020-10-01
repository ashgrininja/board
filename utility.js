// used for sticky pad as well as image

function createBox () {
    let stickyPad = document.createElement("div");
    let navBar = document.createElement("div");
    let close = document.createElement("div");
    let minimize = document.createElement("div");
    let textBox = document.createElement("div");
    
    // add Classes, attributes
    stickyPad.setAttribute("class", "stickyPad");
    navBar.setAttribute("class", "nav-bar");
    close.setAttribute("class", "close");
    minimize.setAttribute("class", "minimize");
    textBox.setAttribute("class", "textbox");

    // Create SubTree => DOM
    stickyPad.appendChild(navBar);
    stickyPad.appendChild(textBox);

    navBar.appendChild(minimize);
    navBar.appendChild(close);

    // Add Subtree To Main Page => Tree
    document.body.appendChild(stickyPad);

    // Add Event Listners to Add functionality

    // CLose
    close.addEventListener("click", function () {
        stickyPad.remove();
    });

    // Minimize
    let isOpen = true;
    minimize.addEventListener("click", function () {
        if (isOpen) {
            textBox.style.display = "none";
        }
        else {
            textBox.style.display = "block";
        }
        isOpen = !isOpen;
    })

    // Move => Draw Logic
    let initialX = null;
    let initialY = null;
    let isStickyDown = false;

    navBar.addEventListener("mousedown", function (e) {
        initialX = e.clientX;
        initialY = e.clientY;
        isStickyDown = true;
    })
    // Final COordinates
    // Mouse Move Evenet Listener
    navBar.addEventListener("mousemove", function (e) {

        if (isStickyDown == true) {
            let finalX = e.clientX;
            let finalY = e.clientY;
            let dX = finalX - initialX;
            let dY = finalY - initialY;
            let { top, left } = stickyPad.getBoundingClientRect();
            // in Pixels
            stickyPad.style.top = top + dY + "px";
            stickyPad.style.left = left + dX + "px";
            initialX = finalX;
            initialY = finalY;
        }
    })

    // Mouse Leave mouseUp Listener
    // navBar => Mouse Pointer Up
    navBar.addEventListener("mouseup", function (e) {
        isStickyDown = false;
    })

    // Mouse leave
    navBar.addEventListener("mouseleave", function (e) {
        isStickyDown = false;
    })

    return textBox;

}
