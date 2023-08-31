export class UrlBuilder {
  private _url = "";
  constructor() {}
  setUrl(url: string) {
    this._url = url;
    return this;
  }
  setPath(path: string | undefined) {
    if (path) this._url += path;
    return this;
  }
  setPort(port: number | undefined) {
    if (port) this._url += `:${port}`;
    return this;
  }
  get url() {
    return this._url;
  }
}
