/* eslint-disable no-param-reassign */
interface LoadParams {
  /** Resource's url */
  src: string;
  /** if fail to load then reload time */
  reloadTime?: number;
  id?: string;
  /** onload */
  onload?: (loadedEvent: any) => void;
}

interface LoadStuffParams extends LoadParams {
  type: string;
}

/**
 * 加载外部资源
 */
export function LoadStuff(params: LoadStuffParams) {
  const { src, onload, type, reloadTime = 2, id } = params;
  return new Promise((resolve, reject) => {
    let reloadTimes = 0;

    const loadUrl = src;

    function load(element: HTMLLinkElement | HTMLScriptElement) {
      if (reloadTimes > reloadTime) {
        reject(new Error("load resource fail"));
      } else {
        reloadTimes++;
        element.onload = (...arg) => {
          onload?.(...arg);
          resolve(...arg);
        };
        /** 如果加载失败，尝试继续加载 */
        element.onerror = () => load(element);
        document.head.appendChild(element);
      }
    }

    if (type === "css") {
      if (document.querySelector(`#${id}`)) return resolve(true);
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = loadUrl;
      if (id) link.id = id;
      load(link);
    } else if (type === "script") {
      if (document.querySelector(`#${id}`)) return resolve(true);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = loadUrl;
      // script.crossOrigin = "";
      if (id) script.id = id;
      load(script);
    }
  });
}

/**
 * 加载 link
 *
 * @param {object} options { src: string, onload: func }
 */
export function LoadLink(options: LoadParams) {
  const _options = Object.assign({}, options, {
    type: "css",
  });
  return LoadStuff(_options);
}

/**
 * 加载 script
 *
 * @param {object} options { src: string, onload: func }
 */
export function LoadScript(options: LoadParams) {
  const _options = Object.assign({}, options, {
    type: "script",
  });
  return LoadStuff(_options);
}
