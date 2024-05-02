import { getAllDefinedTables } from "../src/utils/database-meta.ts";
import client from "../src/database/connection.ts";
import { ResultSet } from "./ResultSet.ts";


export const Home = async () => {

    const tables = await getAllDefinedTables(client)
    const results = [] as any[];

    return `
        <html>
            <head>
                <link rel="stylesheet" href="/assets/bootstrap.css"/>
                <link rel="stylesheet" href="/assets/main.css"/>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
                <script src="/assets/client.js"></script>
            </head>
            <body class="bg-dark text-white">
                <header>
                    <h1 class="text-center text-info my-4 line-beam"> Deno DB Explorer </h1>
                </header>
                <main class=""> 
                    <div class="row mx-2">
                        <div id="db-tables" class="bg-dark-2 border border-dark-3 px-2 col-3 rounded-2 py-2"> 
                            <input id="table-filter" class="rounded-2 bg-dark text-white w-100 mb-2 px-1" type="text" placeholder="filter tables"
                                oninput="filterTables(event)"
                            /> 
                            ${
                                tables.map((table: any) => (`
                                    <div class="d-block fs-8 pointer hover:underline text-info" table="${table.tableName}" onclick="viewTable(event)"> 
                                        ${table.tableName}
                                        <span class="ps-1 text-light text-decoration-none">${table.count}</span>
                                    </div> 
                                `)).join('')
                            }
                        </div>
                        <div class="col-9"> 
                            <div>
                                <textarea id="sql" rows="3" class="rounded-2 bg-dark text-white w-100 px-1 font-monospace" type="text"></textarea>
                                <button class="btn btn-info d-block ms-auto mt-2" onclick="execute()">
                                    Execute Statement
                                </button>
                            </div>
                            <div id="result-set">
                                ${ ResultSet(results) }
                            </div>
                        </div>
                    </div>
                </main>
            </body>
        </html>
    `
}
