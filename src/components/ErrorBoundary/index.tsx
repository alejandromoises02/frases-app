import React from 'react';
import { Wrapper, Title, Message, Buttons } from './styles';

type State = {
  hasError: boolean;
  error?: Error | null;
  info?: React.ErrorInfo | null;
};

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<object>,
  State
> {
  constructor(props: React.PropsWithChildren<object>) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Uncaught error in component tree:', error, info);
    this.setState({ info });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, info: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Wrapper role="alert">
          <Title>Algo salió mal</Title>
          <Message>
            Hubo un error al mostrar este módulo. Intenta recargar o
            reintentar.
          </Message>

          <Buttons>
            <button
              type="button"
              onClick={this.handleReset}
              aria-label="Reintentar"
            >
              Reintentar
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Recargar página
            </button>
          </Buttons>
        </Wrapper>
      );
    }

    return this.props.children;
  }
}
