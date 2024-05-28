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

const rows = []
let sum = 0
      
window
    .location
    .search
    .substr(1)
    .split("&")
    .forEach(item => {
        const [id, positions] = item.split("=")
        
        const img = document.createElement("img")
        img.src =
            "https://www.torn.com/images/items/"
            + id
            + "/large.png"
        
        const first_line = rows.length
        
        positions
            .split("_")
            .forEach(position => {
                const cells = [
                    document.createElement("td"),
                    document.createElement("td"),
                    document.createElement("td"),
                    document.createElement("td"),
                    document.createElement("td")
                ] 
                const [qty, price] = position.split(".").map(Number)
                cells[2].textContent = formatNumber(qty)
                cells[3].textContent = "$" + formatNumber(price)
                cells[4].textContent = "$" + formatNumber(qty*price)
                sum += qty*price
                rows.push(cells)
            })

        rows[first_line][0].appendChild(img)
        rows[first_line][1].textContent = item_names[id]
    })

const tbody = document.createElement("tbody")

rows.forEach(row => {
    const elem = document.createElement("tr")
    row.forEach(c => {elem.appendChild(c)})
    tbody.appendChild(elem)
})

const receipt_table = document.getElementById("receipt")

receipt_table.appendChild(tbody)

if(rows.length>1) {
    const sum_label_cell = document.createElement("td")
    sum_label_cell.textContent = "Sum:"
    sum_label_cell.colSpan = 4
    sum_label_cell.style.textAlign = "right"

    const sum_cell = document.createElement("td")
    sum_cell.textContent = "$" + formatNumber(sum)
    
    const last_row = document.createElement("tr")
    last_row.appendChild(sum_label_cell)
    last_row.appendChild(sum_cell)
    
    const tfoot = document.createElement("tfoot")
    tfoot.appendChild(last_row)
    
    receipt_table.appendChild(tfoot)    
}
