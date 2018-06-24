console.log("looks like we made it")
// aaa,bbb,ccc,ddd,eee,fff,ggg,hhh

const textarea = document.querySelector('textarea');
const button = document.querySelector('button')
const teams = document.querySelector('.teams-wrapper')
const shadow = document.querySelector('#shadow-div')



//TODO - find a way to set a limit so text area can't overrun it's container
textarea.addEventListener('keyup', function () {
    const el = this;
    let textContent = el.value;
    // console.log(textContent.split("\n"))
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
    buildShadow(groupsArray)
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

function buildShadow(groupsArray) {
    console.log(groupsArray);
    
    let textArea = document.createElement('textarea')
    textArea.setAttribute("id","shadow-div")
    textArea.setAttribute("style","opacity: 0")
    let textContent = document.createTextNode("")
    let teamNum = 1
    textContent.appendData("```\n")
    textContent.appendData("# Teams\n")
    groupsArray.forEach(group => {
        textContent.appendData(`Team ${teamNum}\n`)
        textContent.appendData(`${group.join(" ")}\n`)
        teamNum +=1
    });
    textContent.appendData("```\n")
    console.log(textContent)
    // textArea.value = textContent
    document.body.appendChild(textArea)
    let copyText = document.querySelector("#shadow-div")
    console.log(copyText)
    copyText.value = textContent.data
    // debugger
    copyText.select()
    document.execCommand("copy")
}

