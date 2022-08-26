import { Component, ErrorInfo, ReactNode, Suspense } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class AvatarErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: State) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    //console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          className="bg-gray-100 rounded-md mt-4 flex justify-center items-center"
          style={{ height: 280 }}>
          <h5 className="mt-5 mb-3 text-base font-semibold text-gray-900 md:text-xl">
            Can not display avatar preview
          </h5>
        </div>
      );
    }

    return (
      <Suspense fallback={<div style={{ height: 280 }}></div>}>{this.props.children}</Suspense>
    );
  }
}
