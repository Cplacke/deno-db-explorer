import { getHeaders } from "./src/utils/headers.ts";
import { Home } from './client/Home.ts';
import { executeSql } from './src/database/executer.ts'


Deno.serve(async (req: Request) => {

  const url = new URL(req.url);
  let body: string | ReadableStream<Uint8Array> = 'NOT IMPLEMENTED'

  // home page
  if (url.pathname === '/') {
    url.pathname += 'index.html'
    body = await Home();
  } else 

  // execute statement
  if (url.pathname === '/execute') {
    url.pathname += 'result.html'
    const sql = await req.text();
    body = await executeSql(sql);
  } else 
  
  // serve asset files 
  if (url.pathname.includes('assets')) {
    const file = await Deno.open(`.${url.pathname}`, { read: true });
    body = file.readable;
  }

  return new Response(body, {
      status: 200,
      headers: getHeaders(url) 
    }
  );

});

