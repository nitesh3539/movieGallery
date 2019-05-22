"use strict";

class RestAPI {
  async _fetch(url, opts, fetchRequestId) {
    const response = await fetch(url, opts, fetchRequestId);
    const { status, code, headers, _bodyText } = response;
    let res = {
      status,
      code,
      headers,
      _bodyText,
      json: {}
    };
    //Check if server returned JSON or Text response
    let isJsonResponse = false;
    response.headers.forEach(function(val, key) {
      if (val.indexOf("json") != -1) isJsonResponse = true;
    });
    try {
      res.json = isJsonResponse ? await response.json() : await response.text();
    } catch (e) {
      res.json = {};
    }
    if (res.status != 200 && res.status != 202) {
      throw {
        code: res.status,
        message:
          res.json && res.json.message
            ? res.json.message
            : "Unknow error. Retry or contact support."
      };
    }
    return res;
  }

  serviceCall(url, method = {}) {
    let opts = null;
    if (method) {
      opts = {
        method,
        url,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      };
    }

    //Random number between 1 and 1000
    const fetchRequestId = Math.floor(Math.random() * 1000 + 1);

    //Creating a _fetch request which will timeout in 30 seconds
    return this.timeoutPromise(
      30 * 1000,
      new Error("Timed Out!"),
      this._fetch(url, opts, fetchRequestId)
    )
      .then(res => {
        return res;
      })
      .catch(e => {
        //Aborting the Fetch API call
        fetch.abort(fetchRequestId);

        //Throw custom error instance
        if (e instanceof Error) {
          throw {
            code: 504,
            message: "Slow or no internet on Device."
          };
        } else {
          throw e;
        }
      });
  }

  //Wrapper function to timeout a "Promise" after specific time
  timeoutPromise(timeout, err, promise) {
    return new Promise(function(resolve, reject) {
      promise.then(resolve, reject);
      setTimeout(reject.bind(null, err), timeout);
    });
  }
}
export let restAPI = new RestAPI();
