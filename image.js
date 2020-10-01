let imgInput = document.querySelector("#acceptImg");


function uploadImage () {
    // dialog box
    imgInput.click();
    imgInput.addEventListener("change", function () {

        // console.log(imgInput.files);
        let imgObj = imgInput.files[0];
        // console.log(imgObj);
        let imgLink = URL.createObjectURL(imgObj);// Global Object
        let img = document.createElement("img");
        img.setAttribute("class", "upload-img");
        img.src = imgLink; // load image
        let textBox = createBox();
        textBox.appendChild(img);
    })
}

function downloadBoard () {
    
    // create anchor
    // e.preventDefault()
    let a = document.createElement("a");
    // set filename to it's download attribute
    a.download = "file-png";
    // convert canvas board to url
    let url = board.toDataURL("image/png;base64");
    // set as hrf of anchor
    a.href = url;
    //click the anchor
    a.click();

    // reload behaviour does not get triggered
    a.remove();

}
