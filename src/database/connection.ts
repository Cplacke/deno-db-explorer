import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts";
import { connectionConfig } from "./config.ts";

const client = await new Client().connect(connectionConfig);

export default client;
