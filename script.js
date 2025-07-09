const REFRESH_INTERVAL = 20000
const dataDiv = document.getElementById('data');
const bottombar_textDiv = document.getElementById('bottombar_text');
let intervalId = null



async function refreshData()
{
    console.log("1")

    let res = await fetch("http://we-courtesy.gl.at.ply.gg:14926/api/v1", {
        method: "GET"
    })
    const json = await res.json()

    console.log("2")

    console.log(json)
    
    updateContent(json)
}

document.querySelector(".btnRefresh").addEventListener("click", () =>
{
    refreshData()
})

function startInterval() {
    intervalId = setInterval(() => {
            refreshData()
        }, REFRESH_INTERVAL)
}

document.addEventListener("visibilitychange", () =>
{
    console.log("change")
    if (document.visibilityState === "visible") {
        startInterval()

    }
    else {
        clearInterval(intervalId)
    }
})

function updateContent(data) {
    dataDiv.textContent = ""

    bottombar_textDiv.textContent = data["title"]

    const tatamis = document.getElementById("tatamis")

    while (tatamis.firstChild) {
        tatamis.removeChild(tatamis.firstChild)
    }

    for (const key in data["tatamis"]) {
        
        const item = data["tatamis"][key];
        const newdiv = document.createElement("div");
        newdiv.classList.add("tatami");
        tatamis.appendChild(newdiv);

        const div_title = document.createElement("div");
        div_title.classList.add("tatami_title");
        tatamis.lastChild.appendChild(div_title);
        tatamis.lastChild.lastChild.textContent = `Tatami: ${parseInt(key) + 1}`

        const subdivs = [["Letzte Kategorie", "last"], ["Aktuelle Kategorie", "current"], ["Nächste Kategorie", "next"]]
        for (const index in subdivs) {
            
            const newdiv = document.createElement("div");
            newdiv.classList.add("tatami_element");

            const left = document.createElement("div")
            left.classList.add("tatami_element_left")
            left.textContent = subdivs[index][0]
            newdiv.appendChild(left)

            const right = document.createElement("div")
            right.classList.add("tatami_element_right")
            right.textContent = item[subdivs[index][1]]
            newdiv.appendChild(right)

            tatamis.lastChild.appendChild(newdiv);
        }
    }
}

startInterval()
refreshData()
