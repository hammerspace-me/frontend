interface PopupConfiguration<TResult> {
  redirectUri: string;
  url: string;
  height?: number;
  width?: number;
  callback: (result: TResult) => void;
  formatResult: (queryParameters: { key: string; value: string | null }[]) => TResult;
}

class Popup<TResult> {
  private readonly width: number;
  private readonly height: number;
  private readonly url: string;
  private readonly redirectUri: string;
  private popup: Window | null = null;
  private callback: (result: TResult) => void;
  private windowClosedCheckInterval: NodeJS.Timer | null = null;
  private redirectCheckInterval: NodeJS.Timer | null = null;
  private formatResult: (queryParameters: { key: string; value: string | null }[]) => TResult;

  constructor(configuration: PopupConfiguration<TResult>) {
    this.height = configuration.height ? configuration.height : 350;
    this.width = configuration.width ? configuration.width : 375;
    this.url = configuration.url;
    this.redirectUri = configuration.redirectUri;
    this.callback = configuration.callback;
    this.formatResult = configuration.formatResult;
  }

  private get popupParams(): string {
    const { height, width, top, left } = this.calculateCenter(this.width, this.height);
    return `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=${width},height=${height},left=${left},top=${top}`;
  }

  private calculateCenter(
    w: number,
    h: number
  ): { width: number; height: number; left: number; top: number } {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : window.screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : window.screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;

    return {
      top: top,
      left: left,
      width: w / systemZoom,
      height: h / systemZoom
    };
  }

  public loadPopup(): void {
    this.popup = window.open('', '_blank', this.popupParams);
    if (!this.popup || this.popup.closed || this.popup.closed === undefined) {
      try {
        this.popup?.close();
      } catch (error) {
        // do nothing
      }
      throw new Error('user-action-required');
    }

    this.popup.location.href = this.url;

    this.windowClosedCheckInterval = setInterval(() => {
      if (this.popup?.closed) this.onWindowClose();
    });

    this.redirectCheckInterval = setInterval(() => this.checkForRedirect());
  }

  private checkForRedirect(): void {
    try {
      const currentWindowUri = this.popup?.location.href;
      if (!currentWindowUri?.startsWith(this.redirectUri)) return;
    } catch (error) {
      return;
    }

    const query = new URLSearchParams(this.popup?.location.search);

    this.onTerminalEvent();

    const queryParameters: { key: string; value: string | null }[] = [
      'accessToken',
      'account',
      'errorMessage'
    ].map((key) => ({ key: key, value: query.get(key) }));

    this.callback(this.formatResult(queryParameters));
  }

  private onWindowClose(): void {
    this.onTerminalEvent();
  }

  private onTerminalEvent(): void {
    // Stop polling for window closing
    if (this.windowClosedCheckInterval) {
      this.windowClosedCheckInterval = null;
    }

    if (this.redirectCheckInterval) {
      this.redirectCheckInterval = null;
    }

    // Clear popup
    this.popup?.close();
    this.popup = null;
  }
}

export default Popup;
