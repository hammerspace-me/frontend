import { Component, ErrorInfo, ReactNode, Suspense } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class AvatarErrorBoundary extends Component<Props, State> {
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    return (
      <Suspense fallback={<div style={{ height: 280 }}></div>}>{this.props.children}</Suspense>
    );
  }
}
