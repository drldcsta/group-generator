console.log("looks like we made it")


const textarea = document.querySelector('textarea');
const button = document.querySelector('button')


textarea.addEventListener('keyup', autosize);
button.addEventListener('click', function handleSubmit(e) {
    e.preventDefault();
    let names = textarea.value
    let nameList = names.split("\n")
    let groupSize = Number(document.querySelector("select#team-size").value)
    // console.table(nameList)
    console.log(generateGroups(nameList,groupSize))
});



//inspired by https://codepen.io/vsync/pen/czgrf (but mine is better)
function autosize() {
    const el = this;
    let textContent = el.value;
    if (textContent.indexOf(",") > 0) {
        const newContent = textContent.replace(",", "\n");
        el.value = newContent;
        console.log(newContent);
        setTimeout(function () {
            let rows = Number(el.getAttribute("rows"))
            el.setAttribute("rows", ++rows)

        }, 0);
    }
}

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