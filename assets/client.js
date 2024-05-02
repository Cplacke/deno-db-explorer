
function filterTables (event) {
    const term = event.target.value.trim();
    const elements = document.querySelectorAll('#db-tables [table]');
    if (!term) {
        elements.forEach(element => {
            element.classList.remove('invisible')
        });
        return;
    } else {
        elements.forEach(element => {
            if (element.textContent.includes(term)) {
                element.classList.remove('invisible')
            } else {
                element.classList.add('invisible')
            }
        })
    }
}

window.onload = () => {
    filterTables({
        target:  document.querySelector('#table-filter')
    });
}

function execute () {
    const sql = document.querySelector('#sql').value;
    fetch('/execute', {
        method: 'POST',
        body: sql,
    }).then((res) => {
        res.text().then((html) => {
            document.querySelector('#result-set').innerHTML = html;
        })
    })
}

function viewTable (event) {
    const table = event.target.getAttribute('table');
    const sql = `SELECT * FROM ${table} LIMIT 100;`;
    document.querySelector('#sql').value = sql;

    fetch('/execute', {
        method: 'POST',
        body: sql,
    }).then((res) => {
        res.text().then((html) => {
            document.querySelector('#result-set').innerHTML = html;
        })
    })
}

function selectTab (index) {
    const links = document.querySelectorAll('#results-tab .nav-link');
    const panes = document.querySelectorAll('#tab-content .tab-pane');
    links.forEach((link) => { link.classList.remove('active') });
    panes.forEach((pane) => { pane.classList.remove('active') });
    links[index].classList.add('active');
    panes[index].classList.add('active');
}

function exportTable () {
    const headers = document.querySelector('.tab-pane.active table thead').querySelectorAll('th');
    const rows = document.querySelector('.tab-pane.active table tbody').querySelectorAll('tr');

    const data = {
        head: [...headers].map((th) => (th.innerText)),
        rows: [...rows].map((tr) => (
            [...tr.querySelectorAll('td')].map((td) => (td.innerText))
        ))
    };

    let csv = data.head.join(',')+'\n';
    data.rows.forEach((row) => {
        csv += row.join(',')+'\n';
    });
    // console.info({csv});
}