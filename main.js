console.log("looks like we made it")


const textarea = document.querySelector('textarea');
const button = document.querySelector('button')


textarea.addEventListener('keyup', function () {
    const el = this;
    let textContent = el.value;
    let contentLength = textContent.split("\n").length
    let rows = Number(el.getAttribute("rows"))
    // console.log(textContent)
    if (textContent.indexOf(",") > 0 || contentLength > rows) {
        const newContent = textContent.replace(",", "\n");
        el.value = newContent;
        console.log("dogs");
        el.setAttribute("rows", ++rows)
    } else {
        el.setAttribute("rows", contentLength)

    }
});




button.addEventListener('click', function handleSubmit(e) {
    e.preventDefault();
    let names = textarea.value
    let nameList = names.split("\n")
    let groupSize = Number(document.querySelector("select#team-size").value)
    // console.table(nameList)
    console.log(generateGroups(nameList, groupSize))
});





function generateGroups(arr, n) {
    let groupsArray = [];

    function shuffleArray(sourceArray) {
        for (let i = 0; i < sourceArray.length - 1; i++) {
            let randIndex = i + Math.floor(Math.random() * (sourceArray.length - i));
            let temp = sourceArray[randIndex];
            sourceArray[randIndex] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    }
    let shufStuds = shuffleArray(arr);
    while (shufStuds.length > 0) {
        let xxx = shufStuds.splice(0, n);
        groupsArray.push(xxx);
    }
    return groupsArray;
}