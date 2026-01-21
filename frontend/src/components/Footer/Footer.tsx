import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-blue-900 text-white flex flex-col items-center justify-center py-2 h-26">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} DBU Clinic. All rights reserved.
          </p>
          <div className="mt-4">
            <p>Contact us: +251-123-456-789 | info@DBUclinic.com</p>
            <div className="flex justify-center gap-4 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-2"
              >
                <FaFacebook /> Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-2"
              >
                <FaTwitter /> Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-2"
              >
                <FaInstagram /> Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
