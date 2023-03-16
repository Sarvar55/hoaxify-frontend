import React, { Component, useEffect, useState } from "react";
import axios from "axios";

export const useApiProgress = (method, path, strictPath) => {
  const [pendingApiCall, setpendingApiCall] = useState(false);
  let requestInterceptor, responseInterceptor;
  useEffect(() => {
    registerInterceptors();
    return () => {
      unRegisterInterceptors();
    };
  }, [path, method, strictPath]);

  const registerInterceptors = () => {
    requestInterceptor = axios.interceptors.request.use((req) => {
      ///bu interceptors bir id number donuyor silemleri bitdikten sonra bu id ye gor arayib siliyor
      updateApiCall(req.method, req.url, true);
      return req;
    });
    responseInterceptor = axios.interceptors.response.use(
      (res) => {
        updateApiCall(res.config.method, res.config.url, false);
        return res;
      },
      (error) => {
        updateApiCall(error.config.method, error.config.url, false);
        throw error;
      }
    );
  };
  const updateApiCall = (httpMethod, url, inProgres) => {
    if (method !== httpMethod) {
      return;
    }
    if (strictPath && url === path) {
      setpendingApiCall(inProgres);
    } else if (!strictPath && url.startsWith(path)) {
      setpendingApiCall(inProgres);
    }
    if (new String(url).startsWith(path) && method === httpMethod) {
      setpendingApiCall(inProgres);
    }
  };
  const unRegisterInterceptors = () => {
    axios.interceptors.request.eject(requestInterceptor);
    axios.interceptors.response.eject(responseInterceptor);
  };

  return pendingApiCall;
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

function withApiProgres(WrappedComponent, path) {
  return class extends Component {
    static displayName = `ApiProgres ${getDisplayName(WrappedComponent)}`;
    state = {
      pendingApiCall: false,
    };

    componentDidMount() {
      this.registerInterceptors();
    }

    componentWillUnmount() {
      this.unRegisterInterceptors();
    }

    render() {
      const pendingApiCall =
        this.state.pendingApiCall || this.props.pendingApiCall;
      return (
        // <div>
        //   {React.cloneElement(this.props.children, {
        //     pendingApiCall: this.state.pendingApiCall,
        //   })}
        // </div>

        <WrappedComponent {...this.props} pendingApiCall={pendingApiCall} />
      );
    }
  };
}

export default withApiProgres;
