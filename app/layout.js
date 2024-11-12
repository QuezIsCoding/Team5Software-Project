import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export const metadata = {
  title: "E-commerce Clone",
  description: "E-commerce website clone built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
          {children}
      </body>
    </html>
  );
}
