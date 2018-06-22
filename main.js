console.log("looks like we made it")
// aaa,bbb,ccc,ddd,eee,fff,ggg,hhh

const textarea = document.querySelector('textarea');
const button = document.querySelector('button')
const teams = document.querySelector('.teams-wrapper')



//TODO - find a way to set a limit so text area can't overrun it's container
textarea.addEventListener('keyup', function () {
    const el = this;
    let textContent = el.value;
    console.log(textContent.split("\n"))
    let contentLength = textContent.split("\n").length
    let rows = Number(el.getAttribute("rows"))
    if (textContent.indexOf(",") > 0 || contentLength > rows) {
        const newContent = textContent.replace(/,/g, "\n");
        el.value = newContent;
        let newLength = newContent.split("\n").length
        el.setAttribute("rows", newLength)
    } else {
        el.setAttribute("rows", contentLength)

    }
});



button.addEventListener('click', function handleSubmit(e) {
    clearTeams();
    e.preventDefault();
    let names = textarea.value
    let nameList = names.split("\n")
    let groupSize = Number(document.querySelector("select#team-size").value)
    // console.table(nameList)
    // console.log(generateGroups(nameList, groupSize))
    generateGroups(nameList, groupSize)
});





function generateGroups(arr, n) {
    let groupsArray = [];
    arr = arr.filter(name => {
        if (name.length > 0) {
            return true
        } else {
            return false
        }
    })
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
    // console.log(groupsArray)
    buildDom(groupsArray);
}

function clearTeams () {
    teams.innerHTML = ""
}

function buildDom(groupsArray) {
    groupsArray.forEach(group => {
        let teamBox = document.createElement('div');
        teamBox.setAttribute('class', 'team-box')
        group.forEach(person => {
            let memberWrapper = document.createElement('div')
            memberWrapper.setAttribute('class', 'member-wrapper')
            let teamMember = document.createElement('div')
            teamMember.setAttribute('class', 'team-member')
            let memberName = document.createTextNode(person)
            teamMember.appendChild(memberName)
            memberWrapper.appendChild(teamMember)
            teamBox.appendChild(memberWrapper)
            teams.appendChild(teamBox)
        });
    });
}