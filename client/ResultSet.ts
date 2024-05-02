

export const ResultSet = (resultSet: any[]) => {

    if (resultSet.length === 0) {
        return `
            <img class="d-block mx-auto my-2" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDVyOWNyYXQ2OXN1aWhwbnZ1bHdqa2FiOHNqamFpbHEwdzlxM2hrbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKHWvON3jhmmf38s0/giphy.gif">
        `
    }

    const cols = Object.keys(resultSet[0])
    return `
        <table class="mt-2"> 
            <thead>
                ${
                    cols.map((column) => (`
                        <td class="border-dark-3 fw-bold px-2 py-1"> 
                            <span class="scrollable"/> 
                                <span> ${column} </span>
                            </span>
                        </td>
                    `)).join('')
                }
            </thead>
            <tbody>
                ${
                    resultSet.map((row) => (`
                        <tr>
                            ${
                                cols.map((column) => (`
                                    <td class="p-1 border-dark-3">
                                        <span class="scrollable ${typeStyle(row[column])}">${printData(row[column])}</span>
                                    </td>
                                `)).join('').replaceAll(/\x0/g, '')
                            }
                        </tr>
                    `)).join('')
                }
            </tbody>
        </table>
    `
}

const typeStyle = (value: any) => {
    if (typeof value === 'number') {
        return 'text-center';
    }
    if (value === null) {
        return 'text-secondary';
    }
}

const printData = (value: any) => {
    if (/\x01/g.test(value)) {
        return 1
    }
    if (/\x00/g.test(value)) {
        return 0
    }
    return value;
}

const isHex = (h: string) => {
    const a = parseInt(h,2);
    console.info({ h, a});
    return (a.toString(2) === h)
}