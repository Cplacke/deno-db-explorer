
import { ClientConfig } from "https://deno.land/x/mysql@v2.12.1/mod.ts";

export const connectionConfig: ClientConfig = {
    hostname: Deno.env.get('DDBE_HOSTNAME'),
    port: Number(Deno.env.get('DDBE_PORT')) || 3306,
    db: Deno.env.get('DDBE_DATABASE_NAME'),
    username: Deno.env.get('DDBE_USERNAME'),
    password: Deno.env.get('DDBE_PASSWORD'),
}
