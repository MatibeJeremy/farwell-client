"use client"

import {Provider} from "react-redux";
import store from "@/store";
import {ToastContainer} from "react-toastify";
import ReduxProvider from "@/store/ReduxProvider";

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" style={{minHeight: '100vh', background: 'linear-gradient(135deg, #2c003e, #ff0080)', color: '#ededed'}}>
      <ReduxProvider>
        <Provider store={store}>
          <body style={{minHeight: '100vh', margin: 0}}>
          <ToastContainer
              position="bottom-right"
              style={{
                bottom: "130px",
                right: "17px",
              }}
              toastStyle={{
                backgroundColor: "FEFEFE",
                boxShadow:
                    "0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
                maxWidth: "356px",
              }}
          />
          {children}
          </body>
        </Provider>
      </ReduxProvider>
      </html>
  );
}
