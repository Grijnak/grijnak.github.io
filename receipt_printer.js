function formatNumber(num) {
    const split_number = []
    while(num>999) {
        split_number.unshift(String(num % 1000).padStart(3,"0"))
        num = Math.floor(num/1000)
    }
    split_number.unshift(String(num))
    return split_number.join(',')
}
      
const item_names = {
    282: "African Violet",
    617: "Banana Orchid",
    384: "Camel Plushie",
    271: "Ceibo Flower",
    273: "Chamois Plushie",
    277: "Cherry Blossom",
    263: "Crocus",
    260: "Dahlia",
    272: "Edelweiss",
    267: "Heather",
    258: "Jaguar Plushie",
    215: "Kitten Plushie",
    281: "Lion Plushie",
    269: "Monkey Plushie",
    266: "Nessie Plushie",
    264: "Orchid",
    274: "Panda Plushie",
    276: "Peony",
    268: "Red Fox Plushie",
    186: "Sheep Plushie",
    618: "Stingray Plushie",
    187: "Teddy Bear Plushie",
    385: "Tribulus Omanense",
    261: "Wolverine Plushie",
    206: "Xanax"
}

const receipt_table = document.getElementById("receipt")
let sum = 0
      
const [time_str, ...items] =
      window
      .location
      .search
      .substr(1)
      .split("&")

items.forEach(item => {
    const [id, positions_str] = item.split("=")
        
    const rows = []
    
    positions_str.split("_").forEach(position => {
        const cells = [
            document.createElement("td"),
            document.createElement("td"),
            document.createElement("td")
        ] 
        const [qty, price] = position.split(".").map(Number)
        cells[0].textContent = formatNumber(qty)
        cells[1].textContent = "$" + formatNumber(price)
        cells[2].textContent = "$" + formatNumber(qty*price)
        sum += qty*price
        rows.push(cells)
    })

    const name_cell = document.createElement("td")
    name_cell.textContent = item_names[id]
    name_cell.rowSpan = rows.length

    rows[0].unshift(name_cell)

    const img = document.createElement("img")
    img.src =
        "https://www.torn.com/images/items/"
        + id
        + "/large.png"

    const img_cell = document.createElement("td")
    img_cell.rowSpan = rows.length
    img_cell.appendChild(img)

    rows[0].unshift(img_cell)

    const tbody = document.createElement("tbody")

    rows.forEach(row => {
        const elem = document.createElement("tr")
        row.forEach(c => {elem.appendChild(c)})
        tbody.appendChild(elem)
    })

    receipt_table.appendChild(tbody)
})

const date_str =
    "Date: "
    + new Date(Number(time_str.split("=")[1])*86400000)
    .toLocaleDateString("en-UK", {day: "2-digit", month: "short", year: "2-digit"})

if(items.length > 1 || items[0].includes("_")) {
    const date_cell = document.createElement("th")
    date_cell.textContent = date_str
    date_cell.colSpan = 3

    const last_row = document.createElement("tr")
    last_row.appendChild(date_cell)
    
    const sum_label_cell = document.createElement("th")
    sum_label_cell.textContent = "Sum:"

    const sum_cell = document.createElement("th")
    sum_cell.textContent = "$" + formatNumber(sum)

    last_row.appendChild(sum_label_cell)
    last_row.appendChild(sum_cell)

    const tfoot = document.createElement("tfoot")
    tfoot.appendChild(last_row)

    receipt_table.appendChild(tfoot)    
} else {
    document.getElementById("date_cell").textContent = date_str
}
