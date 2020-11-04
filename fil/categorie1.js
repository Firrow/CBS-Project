let myCanvas = document.querySelector("#infosList");

let c = myCanvas.getContext("2d");

let w = myCanvas.width;
let h = myCanvas.height;

const radius = 7.5;
const pointDistance = 100;
const nbPoint = 5;

let pointCos = [];

c.beginPath();
for (let i = 0; i < nbPoint; i++)
{
    pointCos[i] =
    {
        "x": w - radius,
        "y": radius + pointDistance * i
    };

    c.arc(pointCos[i].x, pointCos[i].y, radius, 0, Math.PI * 2);
}
c.fill();
c.beginPath();
c.moveTo(w - radius, radius);
c.lineTo(w - radius, radius + pointDistance * (nbPoint - 1));
c.stroke();

let description = [];
for (let point in pointCos)
{
    description[point] = false;
}

let myDiv = document.querySelector("#infos");

myCanvas.onmouseexit = (e) =>
{
    c.clearRect(0, 0, w - (radius * 2), h);
    description.forEach((e) =>
    {
        e = false;
    });
    myCanvas.classList.remove("clickable");
    myCanvas.onclick = null;
}

myCanvas.onmousemove = (e) =>
{
    let changeDescription = false;
    for (let i = 0; i < nbPoint; i++)
    {
        let coXs =
        {
            "min": null,
            "max": w
        };
        if (!description[i])
            coXs.min = w - (radius * 2);
        else
            coXs.min = 0;

        if (e.offsetY >= pointCos[i].y - radius && e.offsetY <= pointCos[i].y + radius &&
            e.offsetX >= coXs.min && e.offsetX <= coXs.max)
        {
            if (!description[i])
            {
                c.textAlign = "end";
                c.textBaseline = "middle"
                c.font = "15px Georgia";
                c.fillText("Information " + (i + 1), w - radius - 25, pointCos[i].y);
                description[i] = true;
            }
            if (!myCanvas.classList.contains("clickable"))
            {
                myCanvas.classList.add("clickable");
                myCanvas.onclick = (e) =>
                {
                    while (myDiv.childElementCount != 0)
                    {
                        myDiv.children[0].remove();
                    }
                    DocCreateElement("h2", "Information " + (i + 1), myDiv);
                    DocCreateElement("p", "Infos à afficher", myDiv)
                }
            }
        }
        else if (description[i])
        {
            c.clearRect(0, 0, w - (radius * 2), h);
            description[i] = false;
            myCanvas.classList.remove("clickable");
            myCanvas.onclick = null;
        }
    }
}



function DocCreateElement(balise, content = null, parent = document.body, id = "", classList = null)
{
    let element = document.createElement(balise);
    element.innerHTML = content;
    parent.appendChild(element);

    element.id = id;
    element.classList = classList;

    return element;
}