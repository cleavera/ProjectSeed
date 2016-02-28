/// <reference path="../../typings/main.d.ts" />
'use strict';

import * as http from 'http';

const PORT: number = 8080;

function handleRequest(request: http.IncomingMessage, response: http.ServerResponse): void {
    'use strict';

    response.end('It Works! Path Hit: ' + request.url);
}

let server: http.Server = http.createServer(handleRequest);

server.listen(PORT, function(): void {
    console.log('Server listening on: http://localhost:%s', PORT);
});
