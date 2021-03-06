function csvlist(head, req) {

    function csv_formatter (header,row){
        var csv_row = header.map(function(key,idx){
                          var val = row[key]
                          // will dump undefined if key is not a real
                          // record in the row, and that is okay as
                          // the next line's join will just make ,,
                          // around the undefined

                          // handle edge cases and remember, there is
                          // no CSV spec, so follow Text::CSV_XS
                          // approach.
                          if (typeof(val) == "object") val = JSON.stringify(val)
                          if (typeof(val) == "string"){
                              val = val.replace(/\"/g, '""')
                              val = '"'+val+'"'
                          }
                          return val
                      })
        send(csv_row.join(','))
        send('\r\n');

    }

    var header
    if ('headers' in req.query) {
        header = JSON.parse(unescape(req.query.headers));
    }
    var row
    // set the response header properly for CSV
    start({"headers":{"Content-Type" : "text/csv; charset=utf-8",
                      'Content-Disposition': 'attachment; filename=signups.csv',
                      'Expires': '0',
                      'Cache-Control': 'must-revalidate, post-check=0, pre-check=0'
                     }})
    send('\r\n')

    if(header===undefined){
        // get the headers from the first row
        row = getRow()
        header = Object.keys(row.value)
        send('"' + header.join('","') + '"\r\n')
        csv_formatter(header,row.value)
    }else{
        send('"' + header.join('","') + '"\r\n');
    }
    while (row = getRow()) {
        csv_formatter(header,row.value)
    }
}
