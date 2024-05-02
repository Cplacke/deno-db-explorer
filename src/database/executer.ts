import client from './connection.ts'
import { ResultSet } from '../../client/ResultSet.ts'

export const executeSql = async (sql: string) => {
    let body = '';

    const result = await executeMultiStatement(sql);
    const data = result.map((d) => (d.rows ? d.rows : [d]));

    const tabs = data.map((_, index) => (`
        <li class="nav-item" role="presentation">
            <button class="nav-link ${index === 0 ? 'active' : ''}" id="nav-${index}" type="button" role="tab" onclick="selectTab(${index})">
                Results ${index}
            </button>
        </li>
    `));
    const content = data.map((set, index) => (`
        <div class="tab-pane ${index === 0 ? 'active' : ''}" id="tab-${index}" role="tabpanel">
            ${ResultSet(set)}
        </div>
    `));

    body = `
        <ul class="nav nav-tabs" id="results-tab" role="tablist">
            ${tabs.join('')}
        </ul>
        <div class="tab-content pb-3 overflow-scroll" id="tab-content">
            ${content.join('')}
        </div>
    `;
    return body;
}

const executeMultiStatement = async (sql: string): Promise<any[]> => {
    const statements = sql
        .split(';')
        .map((s) => (s.trim()))
        .filter((s) => (s.length > 1));

    const result = await client.useConnection(async (conn) => {
        const res = []
        let i = 0;
        try {
            await conn.execute("BEGIN");
            while (i < statements.length) {
                res.push( await conn.execute(statements[i]) );
                i++;
            }
            await conn.execute("COMMIT");
            return res;
        } catch (error) {
            try {
                await conn.execute("ROLLBACK");
            } catch (_) {
                return [{
                    error: error,
                    outcome: 'ROLLBACK on Error',
                    statement: statements[i],
                    script_index: i
                }]
            }
        }
    });
    return result || [];
}