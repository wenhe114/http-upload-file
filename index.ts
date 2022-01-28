type Toptions = {
    url: string
    body: Object|any,
    headers?: any,
    success: (e: any) => void,
    progress?: (e: number) => void,
    error?: (e: any) => void
}
export default class httpRequest {
    public options: Toptions
    public xhr:XMLHttpRequest|any={}
    public percent:number=0
    constructor(options: Toptions) {
        this.options = options
    }
    abort(){
        if (!this.xhr) {
            return
        }
        this.xhr.abort()
    }
    request() {
        if (typeof XMLHttpRequest === 'undefined') {
            return;
        }
        this.xhr=new XMLHttpRequest()
        if (this.options.progress) {
            this.xhr.upload.onprogress=(e:ProgressEvent)=>{
                if (e.total > 0) {
                    this.percent = Number(Number((e.loaded / e.total) * 100).toFixed(2));
                    this.percent = this.percent == 100 ? 99 : this.percent;
                  }
                (this.options as any).progress(this.percent)
            }
        }
        if (this.options.error) {
            this.xhr.onerror=(e:ProgressEvent)=>{
                (this.options as any).error(e)
            }
        }

        const formData = new FormData();
        if (this.options.body) {
            Object.keys(this.options.body).forEach(key => {
                formData.append(key, this.options.body[key]);
            });
        }
        this.xhr.onload = () => {
            if (!this.xhr) {
                return
            }
            if (this.xhr.status < 200 || this.xhr.status >= 300) {
                console.log("出错了");
                (this.options as any).error(this.getError())
                return;
            }
            this.percent=100;
            if ((this.options as any).progress) {
                (this.options as any).progress(this.percent)
            }
            
            this.options.success(this.getBody())
        }
        this.xhr.open("post", this.options.url, true)
        for (let item in this.options.headers) {
            if (this.options.headers.hasOwnProperty(item) && this.options.headers[item] !== null) {
                this.xhr.setRequestHeader(item, this.options.headers[item]);
            }
        }
        this.xhr.send(formData)
    }

    getError() {
        let msg;
        if (!this.xhr) {
            return
        }
        if (this.xhr.response) {
            msg = `${this.xhr.response.error || this.xhr.response}`;
        } else if (this.xhr.responseText) {
            msg = `${this.xhr.responseText}`;
        } else {
            msg = `fail to post ${this.options.url} ${this.xhr.status}`;
        }

        const err: any = new Error(msg);
        err.status = this.xhr.status;
        err.method = 'post';
        err.url = this.options.url;
        return err;
    }

    getBody() {
        if (!this.xhr) {
            return;
        }
        const text = this.xhr.responseText || this.xhr.response;
        if (!text) {
            return text;
        }

        try {
            return JSON.parse(text);
        } catch (e) {
            return text;
        }
    }
}