.setHeader('Content-Type', 'text/html');
        res.write('<html><head><title>My Server</title></head><body><h1>Congrats! u have submitted your data</h1></body></html>');
        return res.end();