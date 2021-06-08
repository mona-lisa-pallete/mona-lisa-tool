export class DebounceClass {
  callback!: Function;

  delay!: number;

  timer!: number;

  constructor(fn?: Function, delay = 100) {
    if (typeof fn === "function") {
      this.callback = fn;
      this.delay = delay;
    }
  }

  exec = (fn: Function, delay = 100) => {
    if (typeof fn === "function") {
      this.callback = fn;
      this.delay = delay;
    }
    this._clearTimer();
    this._exec();
  };

  _exec = () => {
    const { callback, delay } = this;
    this.timer = setTimeout(callback, delay);
  };

  cancel() {
    this._clearTimer();
  }

  _clearTimer() {
    if (this.timer) clearTimeout(this.timer);
  }
}

export const getJSON = (data: string) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:22111/${data}.json`)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });
};
