import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts";
import { getTypeFromId } from './type-map.ts'


export const getAllDefinedTables = async (conn: Client) => {
    const tables = await conn.query(`
        SELECT * 
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_TYPE = 'BASE TABLE' 
    `);

    const meta = await Promise.all(
        tables.map(
            async(row: any) => {
                const countQuery = await conn.query(`SELECT COUNT(*) as c FROM ${row.TABLE_NAME};`);
                return { 
                    tableName: row.TABLE_NAME, 
                    count: countQuery[0].c
                };
            }
        )
    );

    return meta.sort((a: any, b: any) => (
        a.tableName.localeCompare(b.tableName)
    ));
}

export const getAllTableColumns = async (conn: Client, tableName: string) => {
    const meta = await conn.execute(`SELECT * FROM ${tableName}`);
    const columns = meta.fields?.map((field) => ({
        table: field.table,
        name: field.name,
        type: getTypeFromId(field.fieldType),
        length: field.fieldLen,
    }));

    return columns;
}