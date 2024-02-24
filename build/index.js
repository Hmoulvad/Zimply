// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};
var escapeRe = /[&<>'"]/;
var stringBufferToString = async (buffer) => {
  let str = "";
  const callbacks = [];
  for (let i = buffer.length - 1;; i--) {
    str += buffer[i];
    i--;
    if (i < 0) {
      break;
    }
    let r = await buffer[i];
    if (typeof r === "object") {
      callbacks.push(...r.callbacks || []);
    }
    const isEscaped = r.isEscaped;
    r = await (typeof r === "object" ? r.toString() : r);
    if (typeof r === "object") {
      callbacks.push(...r.callbacks || []);
    }
    if (r.isEscaped ?? isEscaped) {
      str += r;
    } else {
      const buf = [str];
      escapeToBuffer(r, buf);
      str = buf[0];
    }
  }
  return raw(str, callbacks);
};
var escapeToBuffer = (str, buffer) => {
  const match = str.search(escapeRe);
  if (match === -1) {
    buffer[0] += str;
    return;
  }
  let escape;
  let index;
  let lastIndex = 0;
  for (index = match;index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escape = "&quot;";
        break;
      case 39:
        escape = "&#39;";
        break;
      case 38:
        escape = "&amp;";
        break;
      case 60:
        escape = "&lt;";
        break;
      case 62:
        escape = "&gt;";
        break;
      default:
        continue;
    }
    buffer[0] += str.substring(lastIndex, index) + escape;
    lastIndex = index + 1;
  }
  buffer[0] += str.substring(lastIndex, index);
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then((res) => Promise.all(res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))).then(() => buffer[0]));
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
};

// node_modules/hono/dist/context.js
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setHeaders = (headers, map = {}) => {
  Object.entries(map).forEach(([key, value]) => headers.set(key, value));
  return headers;
};
var _status;
var _executionCtx;
var _headers;
var _preparedHeaders;
var _res;
var _isFresh;
var Context = class {
  constructor(req, options) {
    this.env = {};
    this._var = {};
    this.finalized = false;
    this.error = undefined;
    __privateAdd(this, _status, 200);
    __privateAdd(this, _executionCtx, undefined);
    __privateAdd(this, _headers, undefined);
    __privateAdd(this, _preparedHeaders, undefined);
    __privateAdd(this, _res, undefined);
    __privateAdd(this, _isFresh, true);
    this.layout = undefined;
    this.renderer = (content) => this.html(content);
    this.notFoundHandler = () => new Response;
    this.render = (...args) => this.renderer(...args);
    this.setLayout = (layout) => this.layout = layout;
    this.getLayout = () => this.layout;
    this.setRenderer = (renderer) => {
      this.renderer = renderer;
    };
    this.header = (name, value, options2) => {
      if (value === undefined) {
        if (__privateGet(this, _headers)) {
          __privateGet(this, _headers).delete(name);
        } else if (__privateGet(this, _preparedHeaders)) {
          delete __privateGet(this, _preparedHeaders)[name.toLocaleLowerCase()];
        }
        if (this.finalized) {
          this.res.headers.delete(name);
        }
        return;
      }
      if (options2?.append) {
        if (!__privateGet(this, _headers)) {
          __privateSet(this, _isFresh, false);
          __privateSet(this, _headers, new Headers(__privateGet(this, _preparedHeaders)));
          __privateSet(this, _preparedHeaders, {});
        }
        __privateGet(this, _headers).append(name, value);
      } else {
        if (__privateGet(this, _headers)) {
          __privateGet(this, _headers).set(name, value);
        } else {
          __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
          __privateGet(this, _preparedHeaders)[name.toLowerCase()] = value;
        }
      }
      if (this.finalized) {
        if (options2?.append) {
          this.res.headers.append(name, value);
        } else {
          this.res.headers.set(name, value);
        }
      }
    };
    this.status = (status) => {
      __privateSet(this, _isFresh, false);
      __privateSet(this, _status, status);
    };
    this.set = (key, value) => {
      this._var ?? (this._var = {});
      this._var[key] = value;
    };
    this.get = (key) => {
      return this._var ? this._var[key] : undefined;
    };
    this.newResponse = (data, arg, headers) => {
      if (__privateGet(this, _isFresh) && !headers && !arg && __privateGet(this, _status) === 200) {
        return new Response(data, {
          headers: __privateGet(this, _preparedHeaders)
        });
      }
      if (arg && typeof arg !== "number") {
        const headers2 = setHeaders(new Headers(arg.headers), __privateGet(this, _preparedHeaders));
        return new Response(data, {
          headers: headers2,
          status: arg.status
        });
      }
      const status = typeof arg === "number" ? arg : __privateGet(this, _status);
      __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
      __privateGet(this, _headers) ?? __privateSet(this, _headers, new Headers);
      setHeaders(__privateGet(this, _headers), __privateGet(this, _preparedHeaders));
      if (__privateGet(this, _res)) {
        __privateGet(this, _res).headers.forEach((v, k) => {
          __privateGet(this, _headers)?.set(k, v);
        });
        setHeaders(__privateGet(this, _headers), __privateGet(this, _preparedHeaders));
      }
      headers ?? (headers = {});
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          __privateGet(this, _headers).set(k, v);
        } else {
          __privateGet(this, _headers).delete(k);
          for (const v2 of v) {
            __privateGet(this, _headers).append(k, v2);
          }
        }
      }
      return new Response(data, {
        status,
        headers: __privateGet(this, _headers)
      });
    };
    this.body = (data, arg, headers) => {
      return typeof arg === "number" ? this.newResponse(data, arg, headers) : this.newResponse(data, arg);
    };
    this.text = (text, arg, headers) => {
      if (!__privateGet(this, _preparedHeaders)) {
        if (__privateGet(this, _isFresh) && !headers && !arg) {
          return new Response(text);
        }
        __privateSet(this, _preparedHeaders, {});
      }
      __privateGet(this, _preparedHeaders)["content-type"] = TEXT_PLAIN;
      return typeof arg === "number" ? this.newResponse(text, arg, headers) : this.newResponse(text, arg);
    };
    this.json = (object, arg, headers) => {
      const body = JSON.stringify(object);
      __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
      __privateGet(this, _preparedHeaders)["content-type"] = "application/json; charset=UTF-8";
      return typeof arg === "number" ? this.newResponse(body, arg, headers) : this.newResponse(body, arg);
    };
    this.html = (html2, arg, headers) => {
      __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
      __privateGet(this, _preparedHeaders)["content-type"] = "text/html; charset=UTF-8";
      if (typeof html2 === "object") {
        if (!(html2 instanceof Promise)) {
          html2 = html2.toString();
        }
        if (html2 instanceof Promise) {
          return html2.then((html22) => resolveCallback(html22, HtmlEscapedCallbackPhase.Stringify, false, {})).then((html22) => {
            return typeof arg === "number" ? this.newResponse(html22, arg, headers) : this.newResponse(html22, arg);
          });
        }
      }
      return typeof arg === "number" ? this.newResponse(html2, arg, headers) : this.newResponse(html2, arg);
    };
    this.redirect = (location, status = 302) => {
      __privateGet(this, _headers) ?? __privateSet(this, _headers, new Headers);
      __privateGet(this, _headers).set("Location", location);
      return this.newResponse(null, status);
    };
    this.notFound = () => {
      return this.notFoundHandler(this);
    };
    this.req = req;
    if (options) {
      __privateSet(this, _executionCtx, options.executionCtx);
      this.env = options.env;
      if (options.notFoundHandler) {
        this.notFoundHandler = options.notFoundHandler;
      }
    }
  }
  get event() {
    if (__privateGet(this, _executionCtx) && ("respondWith" in __privateGet(this, _executionCtx))) {
      return __privateGet(this, _executionCtx);
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (__privateGet(this, _executionCtx)) {
      return __privateGet(this, _executionCtx);
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    __privateSet(this, _isFresh, false);
    return __privateGet(this, _res) || __privateSet(this, _res, new Response("404 Not Found", { status: 404 }));
  }
  set res(_res2) {
    __privateSet(this, _isFresh, false);
    if (__privateGet(this, _res) && _res2) {
      __privateGet(this, _res).headers.delete("content-type");
      for (const [k, v] of __privateGet(this, _res).headers.entries()) {
        if (k === "set-cookie") {
          const cookies = __privateGet(this, _res).headers.getSetCookie();
          _res2.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res2.headers.append("set-cookie", cookie);
          }
        } else {
          _res2.headers.set(k, v);
        }
      }
    }
    __privateSet(this, _res, _res2);
    this.finalized = true;
  }
  get var() {
    return { ...this._var };
  }
};
_status = new WeakMap;
_executionCtx = new WeakMap;
_headers = new WeakMap;
_preparedHeaders = new WeakMap;
_res = new WeakMap;
_isFresh = new WeakMap;

// node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context2, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        if (context2 instanceof Context) {
          context2.req.routeIndex = i;
        }
      } else {
        handler = i === middleware.length && next || undefined;
      }
      if (!handler) {
        if (context2 instanceof Context && context2.finalized === false && onNotFound) {
          res = await onNotFound(context2);
        }
      } else {
        try {
          res = await handler(context2, () => {
            return dispatch(i + 1);
          });
        } catch (err) {
          if (err instanceof Error && context2 instanceof Context && onError) {
            context2.error = err;
            res = await onError(err, context2);
            isError = true;
          } else {
            throw err;
          }
        }
      }
      if (res && (context2.finalized === false || isError)) {
        context2.res = res;
      }
      return context2;
    }
  };
};

// node_modules/hono/dist/http-exception.js
var HTTPException = class extends Error {
  constructor(status = 500, options) {
    super(options?.message);
    this.res = options?.res;
    this.status = status;
  }
  getResponse() {
    if (this.res) {
      return this.res;
    }
    return new Response(this.message, {
      status: this.status
    });
  }
};

// node_modules/hono/dist/utils/body.js
var isFormDataContent = function(contentType) {
  if (contentType === null) {
    return false;
  }
  return contentType.startsWith("multipart/form-data") || contentType.startsWith("application/x-www-form-urlencoded");
};
async function parseFormData(request2, options) {
  const formData = await request2.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
var convertFormDataToBodyData = function(formData, options) {
  const form = {};
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  return form;
};
var isArrayField = function(field) {
  return Array.isArray(field);
};
var parseBody = async (request2, options = { all: false }) => {
  const headers = request2 instanceof HonoRequest ? request2.raw.headers : request2.headers;
  const contentType = headers.get("Content-Type");
  if (isFormDataContent(contentType)) {
    return parseFormData(request2, options);
  }
  return {};
};
var handleParsingAllValues = (form, key, value) => {
  if (form[key] && isArrayField(form[key])) {
    appendToExistingArray(form[key], value);
  } else if (form[key]) {
    convertToNewArray(form, key, value);
  } else {
    form[key] = value;
  }
};
var appendToExistingArray = (arr, value) => {
  arr.push(value);
};
var convertToNewArray = (form, key, value) => {
  form[key] = [form[key], value];
};

// node_modules/hono/dist/utils/url.js
var splitPath = (path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match, index) => {
    const mark = `@${index}`;
    groups.push([mark, match]);
    return mark;
  });
  return { groups, path };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1;i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1;j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label) => {
  if (label === "*") {
    return "*";
  }
  const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match) {
    if (!patternCache[label]) {
      if (match[2]) {
        patternCache[label] = [label, match[1], new RegExp("^" + match[2] + "$")];
      } else {
        patternCache[label] = [label, match[1], true];
      }
    }
    return patternCache[label];
  }
  return null;
};
var getPath = (request2) => {
  const match = request2.url.match(/^https?:\/\/[^/]+(\/[^?]*)/);
  return match ? match[1] : "";
};
var getQueryStrings = (url) => {
  const queryIndex = url.indexOf("?", 8);
  return queryIndex === -1 ? "" : "?" + url.slice(queryIndex + 1);
};
var getPathNoStrict = (request2) => {
  const result = getPath(request2);
  return result.length > 1 && result[result.length - 1] === "/" ? result.slice(0, -1) : result;
};
var mergePath = (...paths) => {
  let p = "";
  let endsWithSlash = false;
  for (let path of paths) {
    if (p[p.length - 1] === "/") {
      p = p.slice(0, -1);
      endsWithSlash = true;
    }
    if (path[0] !== "/") {
      path = `/${path}`;
    }
    if (path === "/" && endsWithSlash) {
      p = `${p}/`;
    } else if (path !== "/") {
      p = `${p}${path}`;
    }
    if (path === "/" && p === "") {
      p = "/";
    }
  }
  return p;
};
var checkOptionalParameter = (path) => {
  if (!path.match(/\:.+\?$/)) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return /%/.test(value) ? decodeURIComponent_(value) : value;
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf(`?${key}`, 8);
    if (keyIndex2 === -1) {
      keyIndex2 = url.indexOf(`&${key}`, 8);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? undefined : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return;
    }
  }
  const results = {};
  encoded ?? (encoded = /[%+]/.test(url));
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(keyIndex + 1, valueIndex === -1 ? nextKeyIndex === -1 ? undefined : nextKeyIndex : valueIndex);
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? undefined : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      results[name].push(value);
    } else {
      results[name] ?? (results[name] = value);
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _validatedData;
var _matchResult;
var HonoRequest = class {
  constructor(request2, path = "/", matchResult = [[]]) {
    __privateAdd2(this, _validatedData, undefined);
    __privateAdd2(this, _matchResult, undefined);
    this.routeIndex = 0;
    this.bodyCache = {};
    this.cachedBody = (key) => {
      const { bodyCache, raw: raw2 } = this;
      const cachedBody = bodyCache[key];
      if (cachedBody) {
        return cachedBody;
      }
      if (bodyCache.arrayBuffer) {
        return (async () => {
          return await new Response(bodyCache.arrayBuffer)[key]();
        })();
      }
      return bodyCache[key] = raw2[key]();
    };
    this.raw = request2;
    this.path = path;
    __privateSet2(this, _matchResult, matchResult);
    __privateSet2(this, _validatedData, {});
  }
  param(key) {
    return key ? this.getDecodedParam(key) : this.getAllDecodedParams();
  }
  getDecodedParam(key) {
    const paramKey = __privateGet2(this, _matchResult)[0][this.routeIndex][1][key];
    const param = this.getParamValue(paramKey);
    return param ? /\%/.test(param) ? decodeURIComponent_(param) : param : undefined;
  }
  getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(__privateGet2(this, _matchResult)[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.getParamValue(__privateGet2(this, _matchResult)[0][this.routeIndex][1][key]);
      if (value && typeof value === "string") {
        decoded[key] = /\%/.test(value) ? decodeURIComponent_(value) : value;
      }
    }
    return decoded;
  }
  getParamValue(paramKey) {
    return __privateGet2(this, _matchResult)[1] ? __privateGet2(this, _matchResult)[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name.toLowerCase()) ?? undefined;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    if (this.bodyCache.parsedBody) {
      return this.bodyCache.parsedBody;
    }
    const parsedBody = await parseBody(this, options);
    this.bodyCache.parsedBody = parsedBody;
    return parsedBody;
  }
  json() {
    return this.cachedBody("json");
  }
  text() {
    return this.cachedBody("text");
  }
  arrayBuffer() {
    return this.cachedBody("arrayBuffer");
  }
  blob() {
    return this.cachedBody("blob");
  }
  formData() {
    return this.cachedBody("formData");
  }
  addValidatedData(target, data) {
    __privateGet2(this, _validatedData)[target] = data;
  }
  valid(target) {
    return __privateGet2(this, _validatedData)[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get matchedRoutes() {
    return __privateGet2(this, _matchResult)[0].map(([[, route]]) => route);
  }
  get routePath() {
    return __privateGet2(this, _matchResult)[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};
_validatedData = new WeakMap;
_matchResult = new WeakMap;

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// node_modules/hono/dist/hono-base.js
var defineDynamicClass = function() {
  return class {
  };
};
var __accessCheck3 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet3 = (obj, member, getter) => {
  __accessCheck3(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd3 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet3 = (obj, member, value, setter) => {
  __accessCheck3(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var COMPOSED_HANDLER = Symbol("composedHandler");
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
};
var _path;
var _Hono = class extends defineDynamicClass() {
  constructor(options = {}) {
    super();
    this._basePath = "/";
    __privateAdd3(this, _path, "/");
    this.routes = [];
    this.notFoundHandler = notFoundHandler;
    this.errorHandler = errorHandler;
    this.onError = (handler) => {
      this.errorHandler = handler;
      return this;
    };
    this.notFound = (handler) => {
      this.notFoundHandler = handler;
      return this;
    };
    this.fetch = (request3, Env, executionCtx) => {
      return this.dispatch(request3, executionCtx, Env, request3.method);
    };
    this.request = (input, requestInit, Env, executionCtx) => {
      if (input instanceof Request) {
        if (requestInit !== undefined) {
          input = new Request(input, requestInit);
        }
        return this.fetch(input, Env, executionCtx);
      }
      input = input.toString();
      const path = /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`;
      const req = new Request(path, requestInit);
      return this.fetch(req, Env, executionCtx);
    };
    this.fire = () => {
      addEventListener("fetch", (event) => {
        event.respondWith(this.dispatch(event.request, event, undefined, event.request.method));
      });
    };
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.map((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          __privateSet3(this, _path, args1);
        } else {
          this.addRoute(method, __privateGet3(this, _path), args1);
        }
        args.map((handler) => {
          if (typeof handler !== "string") {
            this.addRoute(method, __privateGet3(this, _path), handler);
          }
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      if (!method) {
        return this;
      }
      for (const p of [path].flat()) {
        __privateSet3(this, _path, p);
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.addRoute(m.toUpperCase(), __privateGet3(this, _path), handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        __privateSet3(this, _path, arg1);
      } else {
        __privateSet3(this, _path, "*");
        handlers.unshift(arg1);
      }
      handlers.map((handler) => {
        this.addRoute(METHOD_NAME_ALL, __privateGet3(this, _path), handler);
      });
      return this;
    };
    const strict = options.strict ?? true;
    delete options.strict;
    Object.assign(this, options);
    this.getPath = strict ? options.getPath ?? getPath : getPathNoStrict;
  }
  clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.routes = this.routes;
    return clone;
  }
  route(path, app) {
    const subApp = this.basePath(path);
    if (!app) {
      return subApp;
    }
    app.routes.map((r) => {
      let handler;
      if (app.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next) => (await compose([], app.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  mount(path, applicationHandler, optionHandler) {
    const mergedPath = mergePath(this._basePath, path);
    const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
    const handler = async (c, next) => {
      let executionContext = undefined;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      const options = optionHandler ? optionHandler(c) : [c.env, executionContext];
      const optionsArray = Array.isArray(options) ? options : [options];
      const queryStrings = getQueryStrings(c.req.url);
      const res = await applicationHandler(new Request(new URL((c.req.path.slice(pathPrefixLength) || "/") + queryStrings, c.req.url), c.req.raw), ...optionsArray);
      if (res) {
        return res;
      }
      await next();
    };
    this.addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  matchRoute(method, path) {
    return this.router.match(method, path);
  }
  handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  dispatch(request3, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.dispatch(request3, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request3, { env });
    const matchResult = this.matchRoute(method, path);
    const c = new Context(new HonoRequest(request3, path, matchResult), {
      env,
      executionCtx,
      notFoundHandler: this.notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
        });
        if (!res) {
          return this.notFoundHandler(c);
        }
      } catch (err) {
        return this.handleError(err, c);
      }
      return res instanceof Promise ? res.then((resolved) => resolved || (c.finalized ? c.res : this.notFoundHandler(c))).catch((err) => this.handleError(err, c)) : res;
    }
    const composed = compose(matchResult[0], this.errorHandler, this.notFoundHandler);
    return (async () => {
      try {
        const context3 = await composed(c);
        if (!context3.finalized) {
          throw new Error("Context is not finalized. You may forget returning Response object or `await next()`");
        }
        return context3.res;
      } catch (err) {
        return this.handleError(err, c);
      }
    })();
  }
};
var Hono = _Hono;
_path = new WeakMap;

// node_modules/hono/dist/router/reg-exp-router/node.js
var compareKey = function(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
};
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
var Node = class {
  constructor() {
    this.children = {};
  }
  insert(tokens, index, paramMap, context3, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.index !== undefined) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.children[regexpStr];
      if (!node) {
        if (Object.keys(this.children).some((k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR)) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.children[regexpStr] = new Node;
        if (name !== "") {
          node.varIndex = context3.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.varIndex]);
      }
    } else {
      node = this.children[token];
      if (!node) {
        if (Object.keys(this.children).some((k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR)) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.children[token] = new Node;
      }
    }
    node.insert(restTokens, index, paramMap, context3, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.children[k];
      return (typeof c.varIndex === "number" ? `(${k})@${c.varIndex}` : k) + c.buildRegExpStr();
    });
    if (typeof this.index === "number") {
      strList.unshift(`#${this.index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  constructor() {
    this.context = { varIndex: 0 };
    this.root = new Node;
  }
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0;; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1;i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1;j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.root.insert(tokens, index, paramAssoc, this.context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (typeof handlerIndex !== "undefined") {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (typeof paramIndex !== "undefined") {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var buildWildcardRegExp = function(path) {
  return wildcardRegExpCache[path] ?? (wildcardRegExpCache[path] = new RegExp(path === "*" ? "" : `^${path.replace(/\/\*/, "(?:|/.*)")}\$`));
};
var clearWildcardRegExpCache = function() {
  wildcardRegExpCache = {};
};
var buildMatcherFromPreprocessedRoutes = function(routes) {
  const trie2 = new Trie;
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map((route) => [!/\*|\/:/.test(route[0]), ...route]).sort(([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length);
  const staticMap = {};
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length;i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, {}]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie2.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = {};
      paramCount -= 1;
      for (;paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie2.buildRegExp();
  for (let i = 0, len = handlerData.length;i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length;j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length;k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
};
var findMiddleware = function(middleware, path) {
  if (!middleware) {
    return;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return;
};
var methodNames = [METHOD_NAME_ALL, ...METHODS].map((method) => method.toUpperCase());
var emptyParam = [];
var nullMatcher = [/^$/, [], {}];
var wildcardRegExpCache = {};
var RegExpRouter = class {
  constructor() {
    this.name = "RegExpRouter";
    this.middleware = { [METHOD_NAME_ALL]: {} };
    this.routes = { [METHOD_NAME_ALL]: {} };
  }
  add(method, path, handler) {
    var _a;
    const { middleware, routes } = this;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (methodNames.indexOf(method) === -1) {
      methodNames.push(method);
    }
    if (!middleware[method]) {
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = {};
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          var _a2;
          (_a2 = middleware[m])[path] || (_a2[path] = findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || []);
        });
      } else {
        (_a = middleware[method])[path] || (_a[path] = findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || []);
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach((p) => re.test(p) && routes[m][p].push([handler, paramCount]));
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length;i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        var _a2;
        if (method === METHOD_NAME_ALL || method === m) {
          (_a2 = routes[m])[path2] || (_a2[path2] = [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ]);
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match(method, path) {
    clearWildcardRegExpCache();
    const matchers = this.buildAllMatchers();
    this.match = (method2, path2) => {
      const matcher = matchers[method2];
      const staticMatch = matcher[2][path2];
      if (staticMatch) {
        return staticMatch;
      }
      const match = path2.match(matcher[0]);
      if (!match) {
        return [[], emptyParam];
      }
      const index = match.indexOf("", 1);
      return [matcher[1][index], match];
    };
    return this.match(method, path);
  }
  buildAllMatchers() {
    const matchers = {};
    methodNames.forEach((method) => {
      matchers[method] = this.buildMatcher(method) || matchers[METHOD_NAME_ALL];
    });
    this.middleware = this.routes = undefined;
    return matchers;
  }
  buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.middleware, this.routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute || (hasOwnRoute = true);
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]]));
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  constructor(init) {
    this.name = "SmartRouter";
    this.routers = [];
    this.routes = [];
    Object.assign(this, init);
  }
  add(method, path, handler) {
    if (!this.routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.routes) {
      throw new Error("Fatal error");
    }
    const { routers, routes } = this;
    const len = routers.length;
    let i = 0;
    let res;
    for (;i < len; i++) {
      const router5 = routers[i];
      try {
        routes.forEach((args) => {
          router5.add(...args);
        });
        res = router5.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router5.match.bind(router5);
      this.routers = [router5];
      this.routes = undefined;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.routes || this.routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/node.js
var Node2 = class {
  constructor(method, handler, children) {
    this.order = 0;
    this.params = {};
    this.children = children || {};
    this.methods = [];
    this.name = "";
    if (method && handler) {
      const m = {};
      m[method] = { handler, possibleKeys: [], score: 0, name: this.name };
      this.methods = [m];
    }
    this.patterns = [];
  }
  insert(method, path, handler) {
    this.name = `${method} ${path}`;
    this.order = ++this.order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    const parentPatterns = [];
    for (let i = 0, len = parts.length;i < len; i++) {
      const p = parts[i];
      if (Object.keys(curNode.children).includes(p)) {
        parentPatterns.push(...curNode.patterns);
        curNode = curNode.children[p];
        const pattern2 = getPattern(p);
        if (pattern2) {
          possibleKeys.push(pattern2[1]);
        }
        continue;
      }
      curNode.children[p] = new Node2;
      const pattern = getPattern(p);
      if (pattern) {
        curNode.patterns.push(pattern);
        parentPatterns.push(...curNode.patterns);
        possibleKeys.push(pattern[1]);
      }
      parentPatterns.push(...curNode.patterns);
      curNode = curNode.children[p];
    }
    if (!curNode.methods.length) {
      curNode.methods = [];
    }
    const m = {};
    const handlerSet = {
      handler,
      possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
      name: this.name,
      score: this.order
    };
    m[method] = handlerSet;
    curNode.methods.push(m);
    return curNode;
  }
  gHSets(node3, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node3.methods.length;i < len; i++) {
      const m = node3.methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== undefined) {
        handlerSet.params = {};
        handlerSet.possibleKeys.forEach((key) => {
          const processed = processedSet[handlerSet.name];
          handlerSet.params[key] = params[key] && !processed ? params[key] : nodeParams[key] ?? params[key];
          processedSet[handlerSet.name] = true;
        });
        handlerSets.push(handlerSet);
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.params = {};
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    for (let i = 0, len = parts.length;i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length;j < len2; j++) {
        const node3 = curNodes[j];
        const nextNode = node3.children[part];
        if (nextNode) {
          nextNode.params = node3.params;
          if (isLast === true) {
            if (nextNode.children["*"]) {
              handlerSets.push(...this.gHSets(nextNode.children["*"], method, node3.params, {}));
            }
            handlerSets.push(...this.gHSets(nextNode, method, node3.params, {}));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node3.patterns.length;k < len3; k++) {
          const pattern = node3.patterns[k];
          const params = { ...node3.params };
          if (pattern === "*") {
            const astNode = node3.children["*"];
            if (astNode) {
              handlerSets.push(...this.gHSets(astNode, method, node3.params, {}));
              tempNodes.push(astNode);
            }
            continue;
          }
          if (part === "") {
            continue;
          }
          const [key, name, matcher] = pattern;
          const child = node3.children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp && matcher.test(restPathString)) {
            params[name] = restPathString;
            handlerSets.push(...this.gHSets(child, method, node3.params, params));
            continue;
          }
          if (matcher === true || matcher instanceof RegExp && matcher.test(part)) {
            if (typeof key === "string") {
              params[name] = part;
              if (isLast === true) {
                handlerSets.push(...this.gHSets(child, method, params, node3.params));
                if (child.children["*"]) {
                  handlerSets.push(...this.gHSets(child.children["*"], method, params, node3.params));
                }
              } else {
                child.params = params;
                tempNodes.push(child);
              }
            }
          }
        }
      }
      curNodes = tempNodes;
    }
    const results = handlerSets.sort((a, b) => {
      return a.score - b.score;
    });
    return [results.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  constructor() {
    this.name = "TrieRouter";
    this.node = new Node2;
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (const p of results) {
        this.node.insert(method, p, handler);
      }
      return;
    }
    this.node.insert(method, path, handler);
  }
  match(method, path) {
    return this.node.search(method, path);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter, new TrieRouter]
    });
  }
};

// src/api/routes.ts
var apiRoutes = new Hono2;
apiRoutes.get("/", (c) => {
  return c.html("Hello, World!");
});
var routes_default = apiRoutes;

// node_modules/hono/dist/jsx/constants.js
var DOM_RENDERER = Symbol("RENDERER");
var DOM_ERROR_HANDLER = Symbol("ERROR_HANDLER");
var DOM_STASH = Symbol("STASH");

// node_modules/hono/dist/helper/css/common.js
var PSEUDO_GLOBAL_SELECTOR = ":-hono-global";
var isPseudoGlobalSelectorRe = new RegExp(`^${PSEUDO_GLOBAL_SELECTOR}{(.*)}\$`);
var DEFAULT_STYLE_ID = "hono-css";
var SELECTOR = Symbol();
var CLASS_NAME = Symbol();
var STYLE_STRING = Symbol();
var SELECTORS = Symbol();
var EXTERNAL_CLASS_NAMES = Symbol();
var CSS_ESCAPED = Symbol();
var IS_CSS_ESCAPED = Symbol();
var toHash = (str) => {
  let i = 0, out = 11;
  while (i < str.length) {
    out = 101 * out + str.charCodeAt(i++) >>> 0;
  }
  return "css-" + out;
};
var cssStringReStr = [
  '"(?:(?:\\\\[\\s\\S]|[^"\\\\])*)"',
  "'(?:(?:\\\\[\\s\\S]|[^'\\\\])*)'"
].join("|");
var minifyCssRe = new RegExp([
  "(" + cssStringReStr + ")",
  "(?:" + [
    "^\\s+",
    "\\/\\*.*?\\*\\/\\s*",
    "\\/\\/.*\\n\\s*",
    "\\s+$"
  ].join("|") + ")",
  "\\s*;\\s*(}|$)\\s*",
  "\\s*([{};:,])\\s*",
  "(\\s)\\s+"
].join("|"), "g");
var minify = (css) => {
  return css.replace(minifyCssRe, (_, $1, $2, $3, $4) => $1 || $2 || $3 || $4 || "");
};
var buildStyleString = (strings, values) => {
  const selectors = [];
  const externalClassNames = [];
  const label = strings[0].match(/^\s*\/\*(.*?)\*\//)?.[1] || "";
  let styleString = "";
  for (let i = 0, len = strings.length;i < len; i++) {
    styleString += strings[i];
    let vArray = values[i];
    if (typeof vArray === "boolean" || vArray === null || vArray === undefined) {
      continue;
    }
    if (!Array.isArray(vArray)) {
      vArray = [vArray];
    }
    for (let j = 0, len2 = vArray.length;j < len2; j++) {
      let value = vArray[j];
      if (typeof value === "boolean" || value === null || value === undefined) {
        continue;
      }
      if (typeof value === "string") {
        if (/([\\"'\/])/.test(value)) {
          styleString += value.replace(/([\\"']|(?<=<)\/)/g, "\\$1");
        } else {
          styleString += value;
        }
      } else if (typeof value === "number") {
        styleString += value;
      } else if (value[CSS_ESCAPED]) {
        styleString += value[CSS_ESCAPED];
      } else if (value[CLASS_NAME].startsWith("@keyframes ")) {
        selectors.push(value);
        styleString += ` ${value[CLASS_NAME].substring(11)} `;
      } else {
        if (strings[i + 1]?.match(/^\s*{/)) {
          selectors.push(value);
          value = `.${value[CLASS_NAME]}`;
        } else {
          selectors.push(...value[SELECTORS]);
          externalClassNames.push(...value[EXTERNAL_CLASS_NAMES]);
          value = value[STYLE_STRING];
          const valueLen = value.length;
          if (valueLen > 0) {
            const lastChar = value[valueLen - 1];
            if (lastChar !== ";" && lastChar !== "}") {
              value += ";";
            }
          }
        }
        styleString += `${value || ""}`;
      }
    }
  }
  return [label, minify(styleString), selectors, externalClassNames];
};
var cssCommon = (strings, values) => {
  let [label, thisStyleString, selectors, externalClassNames] = buildStyleString(strings, values);
  const isPseudoGlobal = isPseudoGlobalSelectorRe.exec(thisStyleString);
  if (isPseudoGlobal) {
    thisStyleString = isPseudoGlobal[1];
  }
  const selector = (isPseudoGlobal ? PSEUDO_GLOBAL_SELECTOR : "") + toHash(label + thisStyleString);
  const className = (isPseudoGlobal ? selectors.map((s) => s[CLASS_NAME]) : [selector, ...externalClassNames]).join(" ");
  return {
    [SELECTOR]: selector,
    [CLASS_NAME]: className,
    [STYLE_STRING]: thisStyleString,
    [SELECTORS]: selectors,
    [EXTERNAL_CLASS_NAMES]: externalClassNames
  };
};
var cxCommon = (args) => {
  for (let i = 0, len = args.length;i < len; i++) {
    const arg = args[i];
    if (typeof arg === "string") {
      args[i] = {
        [SELECTOR]: "",
        [CLASS_NAME]: "",
        [STYLE_STRING]: "",
        [SELECTORS]: [],
        [EXTERNAL_CLASS_NAMES]: [arg]
      };
    }
  }
  return args;
};
var keyframesCommon = (strings, ...values) => {
  const [label, styleString] = buildStyleString(strings, values);
  return {
    [SELECTOR]: "",
    [CLASS_NAME]: `@keyframes ${toHash(label + styleString)}`,
    [STYLE_STRING]: styleString,
    [SELECTORS]: [],
    [EXTERNAL_CLASS_NAMES]: []
  };
};
var viewTransitionNameIndex = 0;
var viewTransitionCommon = (strings, values) => {
  if (!strings) {
    strings = [`/* h-v-t ${viewTransitionNameIndex++} */`];
  }
  const content = Array.isArray(strings) ? cssCommon(strings, values) : strings;
  const transitionName = content[CLASS_NAME];
  const res = cssCommon(["view-transition-name:", ""], [transitionName]);
  content[CLASS_NAME] = PSEUDO_GLOBAL_SELECTOR + content[CLASS_NAME];
  content[STYLE_STRING] = content[STYLE_STRING].replace(/(?<=::view-transition(?:[a-z-]*)\()(?=\))/g, transitionName);
  res[CLASS_NAME] = res[SELECTOR] = transitionName;
  res[SELECTORS] = [...content[SELECTORS], content];
  return res;
};

// node_modules/hono/dist/jsx/dom/css.js
var splitRule = (rule) => {
  const result = [];
  let startPos = 0;
  let depth = 0;
  for (let i = 0, len = rule.length;i < len; i++) {
    const char = rule[i];
    if (char === "'" || char === '"') {
      const quote = char;
      i++;
      for (;i < len; i++) {
        if (rule[i] === "\\") {
          i++;
          continue;
        }
        if (rule[i] === quote) {
          break;
        }
      }
      continue;
    }
    if (char === "{") {
      depth++;
      continue;
    }
    if (char === "}") {
      depth--;
      if (depth === 0) {
        result.push(rule.slice(startPos, i + 1));
        startPos = i + 1;
      }
      continue;
    }
  }
  return result;
};
var createCssJsxDomObjects = ({ id }) => {
  let styleSheet = undefined;
  const findStyleSheet = () => {
    if (!styleSheet) {
      styleSheet = document.querySelector(`style#${id}`)?.sheet;
      if (styleSheet) {
        styleSheet.addedStyles = new Set;
      }
    }
    return styleSheet ? [styleSheet, styleSheet.addedStyles] : [];
  };
  const insertRule = (className, styleString) => {
    const [sheet, addedStyles] = findStyleSheet();
    if (!sheet || !addedStyles) {
      Promise.resolve().then(() => {
        if (!findStyleSheet()[0]) {
          throw new Error("style sheet not found");
        }
        insertRule(className, styleString);
      });
      return;
    }
    if (!addedStyles.has(className)) {
      addedStyles.add(className);
      (className.startsWith(PSEUDO_GLOBAL_SELECTOR) ? splitRule(styleString) : [`${className[0] === "@" ? "" : "."}${className}{${styleString}}`]).forEach((rule) => {
        sheet.insertRule(rule, sheet.cssRules.length);
      });
    }
  };
  const cssObject = {
    toString() {
      const selector = this[SELECTOR];
      insertRule(selector, this[STYLE_STRING]);
      this[SELECTORS].forEach(({ [CLASS_NAME]: className, [STYLE_STRING]: styleString }) => {
        insertRule(className, styleString);
      });
      return this[CLASS_NAME];
    }
  };
  const Style2 = ({ children }) => ({
    tag: "style",
    children: (Array.isArray(children) ? children : [children]).map((c) => c[STYLE_STRING]),
    props: { id }
  });
  return [cssObject, Style2];
};
var createCssContext = ({ id }) => {
  const [cssObject, Style2] = createCssJsxDomObjects({ id });
  const newCssClassNameObject = (cssClassName) => {
    cssClassName.toString = cssObject.toString;
    return cssClassName;
  };
  const css2 = (strings, ...values) => {
    return newCssClassNameObject(cssCommon(strings, values));
  };
  const cx2 = (...args) => {
    args = cxCommon(args);
    return css2(Array(args.length).fill(""), ...args);
  };
  const keyframes2 = keyframesCommon;
  const viewTransition2 = (strings, ...values) => {
    return newCssClassNameObject(viewTransitionCommon(strings, values));
  };
  return {
    css: css2,
    cx: cx2,
    keyframes: keyframes2,
    viewTransition: viewTransition2,
    Style: Style2
  };
};
var defaultContext = createCssContext({ id: DEFAULT_STYLE_ID });
var css = defaultContext.css;
var cx = defaultContext.cx;
var keyframes = defaultContext.keyframes;
var viewTransition = defaultContext.viewTransition;
var Style = defaultContext.Style;

// node_modules/hono/dist/helper/css/index.js
var createCssContext2 = ({ id }) => {
  const [cssJsxDomObject, StyleRenderToDom] = createCssJsxDomObjects({ id });
  const contextMap = new WeakMap;
  const replaceStyleRe = new RegExp(`(<style id="${id}">.*?)(</style>)`);
  const newCssClassNameObject = (cssClassName) => {
    const appendStyle = ({ buffer, context: context3 }) => {
      const [toAdd, added] = contextMap.get(context3);
      const names = Object.keys(toAdd);
      if (!names.length) {
        return;
      }
      let stylesStr = "";
      names.forEach((className2) => {
        added[className2] = true;
        stylesStr += className2.startsWith(PSEUDO_GLOBAL_SELECTOR) ? toAdd[className2] : `${className2[0] === "@" ? "" : "."}${className2}{${toAdd[className2]}}`;
      });
      contextMap.set(context3, [{}, added]);
      if (buffer && replaceStyleRe.test(buffer[0])) {
        buffer[0] = buffer[0].replace(replaceStyleRe, (_, pre, post) => `${pre}${stylesStr}${post}`);
        return;
      }
      const appendStyleScript = `<script>document.querySelector('#${id}').textContent+=${JSON.stringify(stylesStr)}</script>`;
      if (buffer) {
        buffer[0] = `${appendStyleScript}${buffer[0]}`;
        return;
      }
      return Promise.resolve(appendStyleScript);
    };
    const addClassNameToContext = ({ context: context3 }) => {
      if (!contextMap.get(context3)) {
        contextMap.set(context3, [{}, {}]);
      }
      const [toAdd, added] = contextMap.get(context3);
      let allAdded = true;
      if (!added[cssClassName[SELECTOR]]) {
        allAdded = false;
        toAdd[cssClassName[SELECTOR]] = cssClassName[STYLE_STRING];
      }
      cssClassName[SELECTORS].forEach(({ [CLASS_NAME]: className2, [STYLE_STRING]: styleString }) => {
        if (!added[className2]) {
          allAdded = false;
          toAdd[className2] = styleString;
        }
      });
      if (allAdded) {
        return;
      }
      return Promise.resolve(raw("", [appendStyle]));
    };
    const className = new String(cssClassName[CLASS_NAME]);
    Object.assign(className, cssClassName);
    className.isEscaped = true;
    className.callbacks = [addClassNameToContext];
    const promise = Promise.resolve(className);
    Object.assign(promise, cssClassName);
    promise.toString = cssJsxDomObject.toString;
    return promise;
  };
  const css22 = (strings, ...values) => {
    return newCssClassNameObject(cssCommon(strings, values));
  };
  const cx2 = (...args) => {
    args = cxCommon(args);
    return css22(Array(args.length).fill(""), ...args);
  };
  const keyframes2 = keyframesCommon;
  const viewTransition2 = (strings, ...values) => {
    return newCssClassNameObject(viewTransitionCommon(strings, values));
  };
  const Style2 = ({ children } = {}) => children ? raw(`<style id="${id}">${children[STYLE_STRING]}</style>`) : raw(`<style id="${id}"></style>`);
  Style2[DOM_RENDERER] = StyleRenderToDom;
  return {
    css: css22,
    cx: cx2,
    keyframes: keyframes2,
    viewTransition: viewTransition2,
    Style: Style2
  };
};
var defaultContext2 = createCssContext2({ id: DEFAULT_STYLE_ID });
var css3 = defaultContext2.css;
var cx2 = defaultContext2.cx;
var keyframes2 = defaultContext2.keyframes;
var viewTransition2 = defaultContext2.viewTransition;
var Style2 = defaultContext2.Style;

// src/app/views/components/Grid/styles.ts
var gridStyle = css3`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--size-3);
  list-style: none;
`;
var colSpan3 = css3`
  grid-column: span 3;
`;
var colSpan4 = css3`
  grid-column: span 4;
`;
var colSpan6 = css3`
  grid-column: span 6;
`;
var colSpan8 = css3`
  grid-column: span 8;
`;
var colSpan12 = css3`
  grid-column: span 12;
`;

// src/app/views/components/Grid/Grid.tsx
var Column = function({ children, span }) {
  return jsxDEV2("li", {
    class: getColSpan(span),
    children
  }, undefined, false, undefined, this);
};
var getColSpan = function(span) {
  switch (span) {
    case 3:
      return colSpan3;
    case 4:
      return colSpan4;
    case 6:
      return colSpan6;
    case 8:
      return colSpan8;
    case 12:
      return colSpan12;
  }
};

// node_modules/hono/dist/jsx/utils.js
var normalizeIntrinsicElementProps = (props) => {
  if (props && ("className" in props)) {
    props["class"] = props["className"];
    delete props["className"];
  }
};

// node_modules/hono/dist/jsx/context.js
var globalContexts = [];

// node_modules/hono/dist/jsx/base.js
var emptyTags = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
var booleanAttributes = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
];
var childrenToStringToBuffer = (children, buffer) => {
  for (let i = 0, len = children.length;i < len; i++) {
    const child = children[i];
    if (typeof child === "string") {
      escapeToBuffer(child, buffer);
    } else if (typeof child === "boolean" || child === null || child === undefined) {
      continue;
    } else if (child instanceof JSXNode) {
      child.toStringToBuffer(buffer);
    } else if (typeof child === "number" || child.isEscaped) {
      buffer[0] += child;
    } else if (child instanceof Promise) {
      buffer.unshift("", child);
    } else {
      childrenToStringToBuffer(child, buffer);
    }
  }
};
var JSXNode = class {
  constructor(tag, props, children) {
    this.isEscaped = true;
    this.tag = tag;
    this.props = props;
    this.children = children;
  }
  toString() {
    const buffer = [""];
    this.localContexts?.forEach(([context6, value]) => {
      context6.values.push(value);
    });
    try {
      this.toStringToBuffer(buffer);
    } finally {
      this.localContexts?.forEach(([context6]) => {
        context6.values.pop();
      });
    }
    return buffer.length === 1 ? buffer[0] : stringBufferToString(buffer);
  }
  toStringToBuffer(buffer) {
    const tag = this.tag;
    const props = this.props;
    let { children } = this;
    buffer[0] += `<${tag}`;
    const propsKeys = Object.keys(props || {});
    for (let i = 0, len = propsKeys.length;i < len; i++) {
      const key = propsKeys[i];
      const v = props[key];
      if (key === "style" && typeof v === "object") {
        const styles = Object.keys(v).map((k) => {
          const property = k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
          return `${property}:${v[k]}`;
        }).join(";");
        buffer[0] += ` style="${styles}"`;
      } else if (typeof v === "string") {
        buffer[0] += ` ${key}="`;
        escapeToBuffer(v, buffer);
        buffer[0] += '"';
      } else if (v === null || v === undefined) {
      } else if (typeof v === "number" || v.isEscaped) {
        buffer[0] += ` ${key}="${v}"`;
      } else if (typeof v === "boolean" && booleanAttributes.includes(key)) {
        if (v) {
          buffer[0] += ` ${key}=""`;
        }
      } else if (key === "dangerouslySetInnerHTML") {
        if (children.length > 0) {
          throw "Can only set one of `children` or `props.dangerouslySetInnerHTML`.";
        }
        children = [raw(v.__html)];
      } else if (v instanceof Promise) {
        buffer[0] += ` ${key}="`;
        buffer.unshift('"', v);
      } else if (typeof v === "function") {
        if (!key.startsWith("on")) {
          throw `Invalid prop '${key}' of type 'function' supplied to '${tag}'.`;
        }
      } else {
        buffer[0] += ` ${key}="`;
        escapeToBuffer(v.toString(), buffer);
        buffer[0] += '"';
      }
    }
    if (emptyTags.includes(tag)) {
      buffer[0] += "/>";
      return;
    }
    buffer[0] += ">";
    childrenToStringToBuffer(children, buffer);
    buffer[0] += `</${tag}>`;
  }
};
var JSXFunctionNode = class extends JSXNode {
  toStringToBuffer(buffer) {
    const { children } = this;
    const res = this.tag.call(null, {
      ...this.props,
      children: children.length <= 1 ? children[0] : children
    });
    if (res instanceof Promise) {
      if (globalContexts.length === 0) {
        buffer.unshift("", res);
      } else {
        const currentContexts = globalContexts.map((c) => [c, c.values.at(-1)]);
        buffer.unshift("", res.then((childRes) => {
          if (childRes instanceof JSXNode) {
            childRes.localContexts = currentContexts;
          }
          return childRes;
        }));
      }
    } else if (res instanceof JSXNode) {
      res.toStringToBuffer(buffer);
    } else if (typeof res === "number" || res.isEscaped) {
      buffer[0] += res;
    } else {
      escapeToBuffer(res, buffer);
    }
  }
};
var JSXFragmentNode = class extends JSXNode {
  toStringToBuffer(buffer) {
    childrenToStringToBuffer(this.children, buffer);
  }
};
var jsxFn = (tag, props, children) => {
  if (typeof tag === "function") {
    return new JSXFunctionNode(tag, props, children);
  } else {
    normalizeIntrinsicElementProps(props);
    return new JSXNode(tag, props, children);
  }
};
var Fragment2 = ({
  children
}) => {
  return new JSXFragmentNode("", {}, Array.isArray(children) ? children : children ? [children] : []);
};

// node_modules/hono/dist/jsx/jsx-dev-runtime.js
var jsxDEV2 = function(tag, props, key) {
  let node4;
  if (!props || !("children" in props)) {
    node4 = jsxFn(tag, props, []);
  } else {
    const children = props.children;
    delete props["children"];
    node4 = Array.isArray(children) ? jsxFn(tag, props, children) : jsxFn(tag, props, [children]);
  }
  node4.key = key;
  return node4;
};

// src/app/views/components/Grid/Grid.tsx
function Grid({ columns }) {
  return jsxDEV2("ul", {
    class: gridStyle,
    children: columns.map((column) => jsxDEV2(Column, {
      span: column.span,
      children: column.children
    }, undefined, false, undefined, this))
  }, undefined, false, undefined, this);
}
// src/app/views/components/UI/Icons/Spinner.tsx
function Spinner() {
  return jsxDEV2("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 256 256",
    children: [
      jsxDEV2("rect", {
        width: "256",
        height: "256",
        fill: "none"
      }, undefined, false, undefined, this),
      jsxDEV2("path", {
        d: "M168,40a97,97,0,0,1,56,88,96,96,0,0,1-192,0A97,97,0,0,1,88,40",
        fill: "none",
        stroke: "currentColor",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "16"
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/app/views/components/UI/Typography/Text/styles.ts
var baseStyle = css3`
  font-family: var(--font-sans);
`;
var bodyStyle = css3`
  font-size: var(--font-size-2);
  font-weight: var(--font-weight-3);
  line-height: var(--font-lineheight-3);
`;
var labelStyle = css3`
  font-size: var(--font-size-0);
  font-weight: var(--font-weight-3);
  line-height: var(--font-lineheight-2);
`;

// src/app/views/components/UI/Typography/Text/Text.tsx
var getVariantStyle = function(variant, className) {
  let args = [baseStyle];
  switch (variant) {
    case "body":
      args.push(bodyStyle);
      break;
    case "label":
      args.push(labelStyle);
      break;
    default:
      args.push(bodyStyle);
  }
  if (className)
    args.push(className);
  return cx2(...args);
};
function Text({
  as,
  variant,
  className,
  children,
  ...rest
}) {
  const Element = as ?? "p";
  return jsxDEV2(Element, {
    class: getVariantStyle(variant, className),
    ...rest,
    children
  }, undefined, false, undefined, this);
}

// src/app/views/components/UI/Button/styles.ts
var baseStyle2 = css3`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: var(--size-2);
  cursor: pointer;
  width: fit-content;
  background-color: transparent;
  border-radius: var(--radius-2);
  border: var(--border-size-1) solid black;
  transition: background-color 0.2s ease;
  gap: var(--size-2);
  color: black;
  text-decoration: none;

  &:hover {
    background-color: var(--gray-2);
  }
`;
var smallStyle = css3`
  height: var(--size-7);

  > svg {
    height: var(--size-4);
    width: var(--size-4);
  }
`;
var mediumStyle = css3`
  height: calc(var(--size-7) + var(--size-2));

  svg {
    height: var(--size-5);
    width: var(--size-5);
  }
`;
var largeStyle = css3`
  height: calc(var(--size-7) + var(--size-3));

  svg {
    height: var(--size-6);
    width: var(--size-6);
  }
`;
var flexReverseStyle = css3`
  flex-direction: row-reverse;
`;
var disabledStyle = css3`
  cursor: default;
  background-color: var(--gray-3);
`;
var fillStyle = css3`
  width: 100%;
`;
var loadingStyle = css3`
  > svg {
    animation: var(--animation-spin);
    color: var(--gray-7);
  }
`;

// src/app/views/components/UI/Button/Button.tsx
var getButtonStyle = function({
  size,
  fill,
  iconPosition,
  isLoading,
  disabled
}) {
  let args = [baseStyle2];
  switch (size) {
    case "small":
      args.push(smallStyle);
      break;
    case "medium":
      args.push(mediumStyle);
      break;
    case "large":
      args.push(largeStyle);
      break;
  }
  if (iconPosition === "left")
    args.push(flexReverseStyle);
  if (fill)
    args.push(fillStyle);
  if (isLoading) {
    args.push(loadingStyle);
    args.push(disabledStyle);
  }
  if (disabled)
    args.push(disabledStyle);
  return cx2(...args);
};
function Button({
  children,
  fill = false,
  icon,
  iconPosition = "right",
  size = "medium",
  isLoading = false,
  disabled = false,
  ...rest
}) {
  return jsxDEV2("button", {
    class: getButtonStyle({ size, iconPosition, fill, isLoading, disabled }),
    disabled: disabled || isLoading,
    ...rest,
    children: isLoading ? jsxDEV2(Spinner, {}, undefined, false, undefined, this) : jsxDEV2(Fragment2, {
      children: [
        children ? jsxDEV2(Text, {
          as: "span",
          variant: "body",
          children
        }, undefined, false, undefined, this) : null,
        icon ? icon : null
      ]
    }, undefined, true, undefined, this)
  }, undefined, false, undefined, this);
}
// src/app/views/components/UI/Button/Link.tsx
var getButtonStyle2 = function({
  size,
  fill,
  iconPosition
}) {
  let args = [baseStyle2];
  switch (size) {
    case "small":
      args.push(smallStyle);
      break;
    case "medium":
      args.push(mediumStyle);
      break;
    case "large":
      args.push(largeStyle);
      break;
  }
  if (iconPosition === "left")
    args.push(flexReverseStyle);
  if (fill)
    args.push(fillStyle);
  return cx2(...args);
};
function LinkButton({
  children,
  fill = false,
  icon,
  iconPosition = "right",
  size = "medium",
  ...rest
}) {
  return jsxDEV2("a", {
    class: getButtonStyle2({ size, iconPosition, fill }),
    ...rest,
    children: [
      children ? jsxDEV2(Text, {
        as: "span",
        variant: "body",
        children
      }, undefined, false, undefined, this) : null,
      icon ? icon : null
    ]
  }, undefined, true, undefined, this);
}
// src/app/views/components/UI/Typography/Headline/styles.ts
var baseStyle3 = css3`
  font-family: var(--font-sans);
  line-height: var(--font-lineheight-1);
  font-weight: var(--font-weight-7);
`;
var h1Style = css3`
  font-size: var(--font-size-8);
`;
var h2Style = css3`
  font-size: var(--font-size-7);
`;
var h3Style = css3`
  font-size: var(--font-size-6);
`;
var h4Style = css3`
  font-size: var(--font-size-5);
`;
var h5Style = css3`
  font-size: var(--font-size-4);
`;
var h6Style = css3`
  font-size: var(--font-size-3);
`;

// src/app/views/components/UI/Typography/Headline/Headline.tsx
var getVariantStyle2 = function(variant, as) {
  switch (variant ?? as) {
    case "h1":
    case "display1":
      return cx2(baseStyle3, h1Style);
    case "h2":
    case "display2":
      return cx2(baseStyle3, h2Style);
    case "h3":
    case "display3":
      return cx2(baseStyle3, h3Style);
    case "h4":
    case "display4":
      return cx2(baseStyle3, h4Style);
    case "h5":
    case "display5":
      return cx2(baseStyle3, h5Style);
    case "h6":
    case "display6":
      return cx2(baseStyle3, h6Style);
    default:
      return cx2(baseStyle3, h2Style);
  }
};
function Headline({ as, variant, children, ...rest }) {
  const Element = as ?? "h2";
  return jsxDEV2(Element, {
    class: getVariantStyle2(variant, as),
    ...rest,
    children
  }, undefined, false, undefined, this);
}
// src/app/views/components/Modules/Hero/styles.ts
var heroStyle = css3`
  height: var(--size-15);
  position: relative;
  display: flex;
  padding: var(--size-4);
  align-items: flex-end;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
`;
var contentStyle = css3`
  display: flex;
  padding: var(--size-4);
  flex-direction: column;
  gap: var(--size-4);
  width: fit-content;
  max-width: var(--size-15);
  background-color: var(--gray-1);
  border-radius: var(--radius-2);
`;

// src/app/views/components/Modules/Hero/Hero.tsx
function Hero({ image, title, subtitle, link }) {
  return jsxDEV2("section", {
    class: heroStyle,
    children: [
      jsxDEV2("img", {
        src: image.src,
        alt: image.alt
      }, undefined, false, undefined, this),
      jsxDEV2("div", {
        class: contentStyle,
        children: [
          jsxDEV2(Headline, {
            children: title
          }, undefined, false, undefined, this),
          jsxDEV2(Text, {
            children: subtitle
          }, undefined, false, undefined, this),
          jsxDEV2(LinkButton, {
            href: link.href,
            children: link.label
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/app/views/components/Footer.tsx
function Footer({ children }) {
  return jsxDEV2("footer", {}, undefined, false, undefined, this);
}

// src/app/views/components/UI/Link/styles.ts
var baseStyle4 = css3`
  color: black;
  text-decoration: underline 0.1rem transparent;
  text-underline-offset: 0.2em;
  transition: text-decoration-color 400ms;

  &:hover {
    text-decoration-color: black;
  }
`;

// src/app/views/components/UI/Link/Link.tsx
function Link({ children, ...rest }) {
  return jsxDEV2("a", {
    class: baseStyle4,
    ...rest,
    children: jsxDEV2(Text, {
      as: "span",
      children
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
}
// src/app/views/components/Header/styles.ts
var headerStyle = css3`
  height: var(--size-9);
  display: flex;
  align-items: center;
  padding: 0 var(--size-2);
`;
var linksStyle = css3`
  display: flex;
  list-style-type: none;
  gap: var(--size-2);
`;

// src/app/views/components/Header/Header.tsx
function Header() {
  return jsxDEV2("header", {
    class: headerStyle,
    children: jsxDEV2("ul", {
      class: linksStyle,
      children: [
        jsxDEV2("li", {
          children: jsxDEV2(Link, {
            href: "/",
            children: "Home"
          }, undefined, false, undefined, this)
        }, undefined, false, undefined, this),
        jsxDEV2("li", {
          children: jsxDEV2(Link, {
            href: "/ui",
            children: "UI"
          }, undefined, false, undefined, this)
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this)
  }, undefined, false, undefined, this);
}
// src/app/views/layout/Root/Scripts.tsx
function Scripts() {
  return jsxDEV2(Fragment2, {
    children: jsxDEV2("script", {
      defer: true,
      src: "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
}

// src/app/views/layout/Root/StyleSheet.tsx
function StyleSheets() {
  return jsxDEV2(Fragment2, {
    children: [
      jsxDEV2("style", {
        children: `
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
      
        * {
          padding: 0;
          margin: 0;
          font: inherit;
          font-family: var(--font-sans);
        }
      `
      }, undefined, false, undefined, this),
      jsxDEV2("link", {
        rel: "stylesheet",
        href: "https://unpkg.com/open-props"
      }, undefined, false, undefined, this),
      jsxDEV2(Style2, {}, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/app/views/layout/Root/styles.ts
var htmlStyle = css3`
  body {
    min-height: 100svh;
  }
  main {
    padding: var(--size-2);
  }
  img,
  picture,
  svg,
  video {
    display: block;
    max-width: 100%;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-wrap: balance;
  }
  p {
    text-wrap: pretty;
  }
  @media (prefers-reduced-motion: no-preference) {
    :has(:target) {
      scroll-behavior: smooth;
      scroll-padding-top: 2rem;
    }
  }
`;

// src/app/views/layout/Root/Root.tsx
function RootLayout({ children, title }) {
  return jsxDEV2("html", {
    class: htmlStyle,
    children: [
      jsxDEV2("head", {
        children: [
          jsxDEV2(StyleSheets, {}, undefined, false, undefined, this),
          jsxDEV2(Scripts, {}, undefined, false, undefined, this),
          jsxDEV2("title", {
            children: title
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      jsxDEV2("body", {
        children: [
          jsxDEV2(Header, {}, undefined, false, undefined, this),
          children,
          jsxDEV2(Footer, {}, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
// src/app/views/pages/Home.tsx
function HomePage() {
  return jsxDEV2(RootLayout, {
    title: "HomePage",
    children: jsxDEV2("main", {
      children: jsxDEV2(Grid, {
        columns: [
          {
            span: 4,
            children: jsxDEV2(Hero, {
              image: {
                src: "https://i.imgur.com/iKlaWhg.png",
                alt: "HonoJS"
              },
              title: "HonoJS",
              subtitle: "A modern web framework for building web applications with TypeScript and JSX",
              link: {
                href: "https://hono.dev",
                label: "Learn more"
              }
            }, undefined, false, undefined, this)
          },
          {
            span: 4,
            children: jsxDEV2(Hero, {
              image: {
                src: "https://i.imgur.com/iKlaWhg.png",
                alt: "HonoJS"
              },
              title: "HonoJS",
              subtitle: "A modern web framework for building web applications with TypeScript and JSX",
              link: {
                href: "https://hono.dev",
                label: "Learn more"
              }
            }, undefined, false, undefined, this)
          },
          {
            span: 4,
            children: jsxDEV2(Hero, {
              image: {
                src: "https://i.imgur.com/iKlaWhg.png",
                alt: "HonoJS"
              },
              title: "HonoJS",
              subtitle: "A modern web framework for building web applications with TypeScript and JSX",
              link: {
                href: "https://hono.dev",
                label: "Learn more"
              }
            }, undefined, false, undefined, this)
          },
          {
            span: 8,
            children: jsxDEV2(Hero, {
              image: {
                src: "https://i.imgur.com/iKlaWhg.png",
                alt: "HonoJS"
              },
              title: "HonoJS",
              subtitle: "A modern web framework for building web applications with TypeScript and JSX",
              link: {
                href: "https://hono.dev",
                label: "Learn more"
              }
            }, undefined, false, undefined, this)
          },
          {
            span: 4,
            children: jsxDEV2(Hero, {
              image: {
                src: "https://i.imgur.com/iKlaWhg.png",
                alt: "HonoJS"
              },
              title: "HonoJS",
              subtitle: "A modern web framework for building web applications with TypeScript and JSX",
              link: {
                href: "https://hono.dev",
                label: "Learn more"
              }
            }, undefined, false, undefined, this)
          }
        ]
      }, undefined, false, undefined, this)
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
}

// src/app/views/components/UI/Accordion/styles.ts
var detailsStyle = css3`
  width: fit-content;
  border: var(--border-size-1) solid black;
  padding: var(--size-2);
  min-height: calc(var(--size-7) + var(--size-2));
  border-radius: var(--radius-2);

  &[open] {
    summary {
      margin-bottom: 0;
    }
  }
`;
var summaryStyle = css3`
  margin: calc(var(--size-2) * -1);
  padding: var(--size-2);
  display: block;
  cursor: pointer;
  transition: margin 0.5s ease-in-out;

  &::marker {
    display: none;
  }
`;

// src/app/views/components/UI/Accordion/Accordion.tsx
function Accordion({ title, children }) {
  return jsxDEV2("details", {
    class: detailsStyle,
    children: [
      jsxDEV2(Text, {
        as: "summary",
        className: summaryStyle,
        children: title
      }, undefined, false, undefined, this),
      children
    ]
  }, undefined, true, undefined, this);
}

// src/app/views/components/UI/Dialog/styles.ts
var backdropFade = keyframes2`
  from {
    background-color: transparent;
  }
  to {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
var dialogStyle = css3`
  display: grid;
  position: fixed;
  inset: 0;
  background-color: white;
  border: none;
  max-height: 100vh;
  padding: var(--size-3);
  box-shadow: var(--shadow-3);

  &[open] {
    &::backdrop {
      animation: ${backdropFade} 0.4 ease forwards;
    }
  }
`;
var centerStyle = css3`
  border-radius: var(--radius-2);
  width: var(--size-15);
  height: var(--size-15);
  max-width: 80vw;
  max-height: 80vh;
  margin: auto;
  transform: scale(0);
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease;

  &[open] {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }
`;
var asideStyle = css3`
  margin-left: auto;
  height: 100vh;
  width: var(--size-15);
  transform: translateX(100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease;

  &[open] {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }

  @media only screen and (max-width: 480px) {
    width: 100vw;
    height: 80vh;
    margin-inline: 0;
    margin-top: auto;
    transform: translateY(100%);
    max-width: 100vw;

    &[open] {
      transform: translateY(0);
    }
  }
`;
var contentStyle2 = css3`
  display: grid;
  grid-template-rows: auto 1fr;
`;
var headerStyle2 = css3`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
var sectionStyle = css3`
  display: grid;
`;

// src/app/views/components/UI/Icons/X.tsx
function X() {
  return jsxDEV2("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 256 256",
    children: [
      jsxDEV2("rect", {
        width: "256",
        height: "256",
        fill: "none"
      }, undefined, false, undefined, this),
      jsxDEV2("line", {
        x1: "200",
        y1: "56",
        x2: "56",
        y2: "200",
        stroke: "currentColor",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "16"
      }, undefined, false, undefined, this),
      jsxDEV2("line", {
        x1: "200",
        y1: "200",
        x2: "56",
        y2: "56",
        stroke: "currentColor",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "16"
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/app/views/components/UI/Dialog/Dialog.tsx
var getDialogStyle = function(type) {
  let styles12 = [dialogStyle];
  styles12.push(type === "center" ? centerStyle : asideStyle);
  return cx2(...styles12);
};
function Dialog({
  children,
  ref,
  type = "center",
  title
}) {
  return jsxDEV2("dialog", {
    "x-ref": ref,
    class: getDialogStyle(type),
    children: jsxDEV2("div", {
      class: contentStyle2,
      children: [
        jsxDEV2("header", {
          class: headerStyle2,
          children: [
            jsxDEV2(Headline, {
              as: "h3",
              children: title
            }, undefined, false, undefined, this),
            jsxDEV2(Button, {
              size: "small",
              "x-on:click": "$refs.dialogRef.close()",
              icon: jsxDEV2(X, {}, undefined, false, undefined, this)
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this),
        jsxDEV2("section", {
          class: sectionStyle,
          children
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this)
  }, undefined, false, undefined, this);
}

// src/app/views/components/UI/Icons/ArrowRight.tsx
function ArrowRight() {
  return jsxDEV2("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 256 256",
    children: [
      jsxDEV2("rect", {
        width: "256",
        height: "256",
        fill: "none"
      }, undefined, false, undefined, this),
      jsxDEV2("line", {
        x1: "40",
        y1: "128",
        x2: "216",
        y2: "128",
        fill: "none",
        stroke: "currentColor",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "16"
      }, undefined, false, undefined, this),
      jsxDEV2("polyline", {
        points: "144 56 216 128 144 200",
        fill: "none",
        stroke: "currentColor",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "16"
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/app/views/components/UI/Icons/Chevron/Down.tsx
function ChevronDown() {
  return jsxDEV2("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 256 256",
    children: [
      jsxDEV2("rect", {
        width: "256",
        height: "256",
        fill: "none"
      }, undefined, false, undefined, this),
      jsxDEV2("polyline", {
        points: "208 96 128 176 48 96",
        fill: "none",
        stroke: "currentColor",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "16"
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/app/views/components/UI/Select/styles.ts
var containerStyle = css3`
  position: relative;
  width: fit-content;

  & > svg {
    width: var(--size-4);
    height: var(--size-4);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: var(--size-2);
  }
`;
var selectStyle = css3`
  height: var(--size-8);
  padding-inline: var(--size-2);
  padding-top: var(--size-3);
  appearance: none;
  background-color: transparent;
  border: var(--border-size-1) solid black;
  border-radius: var(--radius-2);
  min-width: var(--size-13);
`;
var labelStyle2 = css3`
  position: absolute;
  top: var(--size-1);
  left: var(--size-2);
`;

// src/app/views/components/UI/Select/Select.tsx
function Select({ options, label }) {
  return jsxDEV2("div", {
    class: containerStyle,
    children: [
      jsxDEV2(Text, {
        className: labelStyle2,
        as: "label",
        variant: "label",
        children: label
      }, undefined, false, undefined, this),
      jsxDEV2("select", {
        class: selectStyle,
        children: options.map((option) => jsxDEV2("option", {
          children: option
        }, undefined, false, undefined, this))
      }, undefined, false, undefined, this),
      jsxDEV2(ChevronDown, {}, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
// src/app/views/pages/UI/styles.ts
var mainStyle = css3`
  display: grid;
  gap: var(--size-2);
`;
var sectionStyle2 = css3`
  display: grid;
  gap: var(--size-2);
`;

// src/app/views/pages/UI/UI.tsx
function UIPage() {
  return jsxDEV2(RootLayout, {
    title: "UIPage",
    children: jsxDEV2("main", {
      class: mainStyle,
      children: [
        jsxDEV2("section", {
          class: sectionStyle2,
          children: [
            jsxDEV2(Headline, {
              as: "h1",
              children: "Display1"
            }, undefined, false, undefined, this),
            jsxDEV2(Headline, {
              as: "h2",
              children: "Display2"
            }, undefined, false, undefined, this),
            jsxDEV2(Headline, {
              as: "h3",
              children: "Display3"
            }, undefined, false, undefined, this),
            jsxDEV2(Headline, {
              as: "h4",
              children: "Display4"
            }, undefined, false, undefined, this),
            jsxDEV2(Headline, {
              as: "h5",
              children: "Display5"
            }, undefined, false, undefined, this),
            jsxDEV2(Headline, {
              as: "h6",
              children: "Display6"
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this),
        jsxDEV2("section", {
          class: sectionStyle2,
          children: [
            jsxDEV2(Text, {
              variant: "body",
              children: "Body"
            }, undefined, false, undefined, this),
            jsxDEV2(Text, {
              variant: "label",
              children: "Label"
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this),
        jsxDEV2("section", {
          class: sectionStyle2,
          children: jsxDEV2(Select, {
            label: "Label",
            options: ["Item1", "Item2", "Item3", "Item4", "Item5"]
          }, undefined, false, undefined, this)
        }, undefined, false, undefined, this),
        jsxDEV2("section", {
          class: sectionStyle2,
          children: [
            jsxDEV2(Button, {
              size: "small",
              children: "Button Small"
            }, undefined, false, undefined, this),
            jsxDEV2(Button, {
              size: "medium",
              children: "Button Medium"
            }, undefined, false, undefined, this),
            jsxDEV2(Button, {
              size: "large",
              children: "Button Large"
            }, undefined, false, undefined, this),
            jsxDEV2(Button, {
              isLoading: true,
              size: "small"
            }, undefined, false, undefined, this),
            jsxDEV2(Button, {
              isLoading: true,
              size: "medium"
            }, undefined, false, undefined, this),
            jsxDEV2(Button, {
              isLoading: true,
              size: "large"
            }, undefined, false, undefined, this),
            jsxDEV2(Button, {
              icon: jsxDEV2(ArrowRight, {}, undefined, false, undefined, this),
              size: "small",
              children: "Button Small"
            }, undefined, false, undefined, this),
            jsxDEV2(Button, {
              icon: jsxDEV2(ArrowRight, {}, undefined, false, undefined, this),
              size: "medium",
              children: "Button Medium"
            }, undefined, false, undefined, this),
            jsxDEV2(Button, {
              icon: jsxDEV2(ArrowRight, {}, undefined, false, undefined, this),
              size: "large",
              children: "Button Large"
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this),
        jsxDEV2("section", {
          class: sectionStyle2,
          children: jsxDEV2(Accordion, {
            title: "Accordion example",
            children: "This is the content of the accordion."
          }, undefined, false, undefined, this)
        }, undefined, false, undefined, this),
        jsxDEV2("section", {
          "x-data": true,
          class: sectionStyle2,
          children: [
            jsxDEV2(Button, {
              "x-on:click": "$refs.dialogRef.showModal()",
              children: "Open Dialog"
            }, undefined, false, undefined, this),
            jsxDEV2(Dialog, {
              title: "AlpineJS Dialog",
              ref: "dialogRef"
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this)
      ]
    }, undefined, true, undefined, this)
  }, undefined, false, undefined, this);
}
// src/app/routes.tsx
var appRoutes = new Hono2;
appRoutes.get("/", (c) => {
  return c.html(jsxDEV2(HomePage, {}, undefined, false, undefined, this));
});
appRoutes.get("/ui", (c) => {
  return c.html(jsxDEV2(UIPage, {}, undefined, false, undefined, this));
});
var routes_default2 = appRoutes;

// src/index.ts
var app = new Hono2;
app.route("/", routes_default2);
app.route("/api", routes_default);
var src_default = app;
export {
  src_default as default
};
