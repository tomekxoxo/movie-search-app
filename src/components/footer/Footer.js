import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  padding: 1rem;
  text-align: center;
  background-color: #000;
  color: #fff;
  font-size: 2rem;
  .social {
    a {
      margin: 1rem;
      i {
        color: #fff;
      }
      &:hover {
        i {
          transform: scale(1.09);
          color: #cfb53b;
        }
      }
    }
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter>
      <div className="social">
        <a
          href="https://www.linkedin.com/in/tomasz-kasprowicz-2b0709187/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="https://github.com/tomekxoxo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i>
        </a>
      </div>
      <p>&copy; {currentYear} Tomasz Kasprowicz</p>
    </StyledFooter>
  );
};

export default Footer;
