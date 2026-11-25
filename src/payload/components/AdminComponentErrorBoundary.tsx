"use client";

import React from "react";

interface State {
  hasError: boolean;
  errorMessage: string;
}

/**
 * Prevents client-side runtime errors inside custom CMS views or field editors
 * from producing a blank screen. Provides an explicit retry & page reload action.
 */
export class AdminComponentErrorBoundary extends React.Component<
  { children: React.ReactNode; componentName?: string },
  State
> {
  constructor(props: { children: React.ReactNode; componentName?: string }) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error?.message || "Unexpected rendering interruption.",
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(
      `[Admin ErrorBoundary - ${this.props.componentName || "Component"}]:`,
      error,
      info.componentStack
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            padding: "24px",
            margin: "12px 0",
            borderRadius: "8px",
            border: "1px solid #FECACA",
            backgroundColor: "#FEF2F2",
            color: "#991B1B",
          }}
        >
          <p style={{ margin: "0 0 6px 0", fontSize: "14px", fontWeight: 700 }}>
            Unable to render {this.props.componentName || "this section"}
          </p>
          <p style={{ margin: "0 0 14px 0", fontSize: "12px", color: "#7F1D1D" }}>
            {this.state.errorMessage}
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, errorMessage: "" })}
              style={{
                padding: "7px 14px",
                backgroundColor: "#0B1424",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Retry Component
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                padding: "7px 14px",
                backgroundColor: "#FFFFFF",
                color: "#0B1424",
                border: "1px solid #CBD5E1",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
