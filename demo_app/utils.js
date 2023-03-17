const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

/**
 * @module Utils
 * @description Assorted useful utils that are used in many places
 * @author Kier Lindsay (syonfox)
 */
const navUtil = require('./navUtil');
module.exports.uuidv4 = uuidv4;

/**
 *
 * @param router - express router
 * @param view - ie /business
 */
module.exports.routerMapView = (router, view) => {

    router.get(view + '/*?', (req, res) => {

        let v = req.params[0] // file path

        let p = view.substring(1,view.length) + '/'+ v;
        if(p[p.length-1] == '/' ) {
            p = p.substring(0, p.length-1)
        }

        console.log('Rendering: ',p,'<p|v>', v);
        // let stat = fs.statSync(p)
        // if(!stat) console.log('File does not exist');
        console.log("asdasdasdffffff", req);
        res.render(p, {title:"ENDpoint", req:req, page:req.baseURL, sidebar_links: navUtil.sidebar_links})
    })

};

module.exports.validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

/***
 * A util function to get a value out of ether the body or the query
 * @param req the request we want to look at
 * @param key the key to check req.body and req.params for
 */
module.exports.reqGetData = (req, key) => {
    let value = undefined;
    if (typeof req.body[key] != "undefined" && req.body[key] != '') {
        value = req.body[key]
    } else if (typeof req.query[key] != "undefined" && req.query[key] != '') {
        value = req.query[key]
    }

    return value;
}

/**
 * gets the bits of a path /dir/dir/dir/filename.filename.ext
 * @param path
 * @return {{ext: *, filename: *, dir: *}}
 */
module.exports.explodePath = (path) => {

    let s = path.split('/');
    let filename = s.pop().split('.');
    let ext = filename.pop();
    filename = filename.join('.');
    let dir = s.join('/');
    return {ext, filename, dir};
}

var spawn = require('child_process').spawn;
/**
 * Execute and logs stdout/err (spawns a process internally and returns it)
 * @param sh - the shell command as you would type it
 * @param cb - cb(data, done) whenever stdout is received
 */
module.exports.simpleExec = (sh, cb) => {
    let args = sh.split(' ');
    let cmd = args.shift();


    console.log("Spawning: ", sh);
    let proc = spawn(cmd, args);

    proc.stdout.on('data', function (data) {
        console.log(data);
        // status(data, false);
        cb(data, false);
    });

    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', function (data) {
        // status(data, false, true);
        cb(data, false, true);
    });

    proc.on('close', function () {

        // status('Done Executing ' + cmd, true);
        cb('Done Executing ' + cmd, true)
    });


}

/**
 *https://gist.github.com/GuillermoPena/9233069?permalink_comment_id=2364896#gistcomment-2364896
 */
module.exports.fileHash = function (filename, algorithm = 'md5') {
    return new Promise((resolve, reject) => {
        // Algorithm depends on availability of OpenSSL on platform
        // Another algorithms: 'sha1', 'md5', 'sha256', 'sha512' ...
        let shasum = crypto.createHash(algorithm);
        try {
            let s = fs.ReadStream(filename)
            s.on('data', function (data) {
                shasum.update(data)
            })
            // making digest
            s.on('end', function () {
                const hash = shasum.digest('hex')
                return resolve(hash);
            })
        } catch (error) {
            return reject('calc fail');
        }
    });
}
/***
 * A function to convert an array of property object to geojson
 * @param geomProperty the property that contains the geometry
 * @param rows the array of rows
 * @returns {{features: [], type: string}} A geojson Feature Collection
 */
module.exports.rowToGeojson = function (geomProperty, rows) {
    let features = [];
    rows.forEach(row => {
        let geom = JSON.parse(row[geomProperty]);
        delete row[geomProperty];
        let feature = {
            type: 'Feature',
            geometry: geom,
            geometry_name: "geom",
            properties: row,
        }
        features.push(feature);
    });
    let geojson = {
        type: 'FeatureCollection',
        features: features
    }
    return geojson;
}



/***
 * Tries to pares an object out of json returns false if it fails
 * @param jsonString
 * @return {boolean|any}
 */
module.exports.tryParseJSON = function (jsonString) {
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object",
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    } catch (e) {
    }

    return false;
};

/***
 * Returns Directory From a source path
 * @param source the path
 * @returns {*} the fs directory
 */
module.exports.getDirectories = (source) => {
    return fs.readdirSync(source, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
}


/**
 * Groups array by key https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
 * @param {Array} xs the array to group
 * @param {string} key the key to groupby
 * @return {Object}
 */
module.exports.groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}

/**
 * Undoes what groupBy() does
 * @param {Object} grp - Object with arrays of values
 * @return {Array} -the original arrays
 */
module.exports.unGroup = (grp) => {

    //  let keys = Object.keys(grp);
    //  let array = [];
    //  keys.forEach(k => {
    //      array = [...grp[k], ...array]
    //  })
    //  //[...Object.entries(grp).map((v, k) => v)];
    // return array
    return Object.values(grp).flat(2);

}


/**
 * @name RetObject
 * this is my standard way of returning stuff success tells you wether the function successfuly executed or not, msg: is a frendly message of what happened
 * data is any data you wish to return and debug is for debug error messaged or any other developer data
 */
class RetObject {
    /**
     *
     * @param {boolean} success - true if function executed successfully
     * @param {string} msg - a nice message of what happened
     * @param {*} [data] - return data
     * @param {*} [debug] - any developer data
     */
    constructor(success, msg, data, debug) {
        this.success = success;
        this.msg = msg;
        this.data = data;
        this.debug = debug;
    }

}

module.exports.to_pgtimestamp = (date) => {
    //https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(date);

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    var formattedTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    console.log(formattedTime);
    return formattedTime
}

module.exports.RetObject = RetObject;
module.exports.ret = (success, msg, data, debug) => {
    return new RetObject(success, msg, data, debug)
};

/**
 * Execute a slq statement on a pg pool or client
 * @param {pg.Pool | pg.Client} pg - the pool or client to use to execute the statement.
 * @param {string} stmt - the sql statement to execute
 * @param {string} [successMsg] - The message to send on success
 * @return {Promise<RetObject>} - fills in data if success and debug with error if failed;
 */
module.exports.pgExecute = (pg, stmt, successMsg) => {

    if (!successMsg) {
        successMsg = "Successfully Executed Query"
    }
    console.debug("PGExecute: ", stmt);
    return pg.query(stmt)
        .then(out => {
            return new RetObject(true, successMsg, out.rows, undefined);
        })
        .catch(e => {
            console.error(e);
            return new RetObject(false, e.message + " [details] " + e.detail, undefined, e);
        })
}

/**
 * Returns a function that logs the params its called with its parameters
 * @param str - a prefex string(s)
 * @return {Function} - logs all args passed to it
 */
module.exports.logfn = (...str) => {
    return (...args) => {
        console.log(...str, " args: ", ...args)
    }
}
