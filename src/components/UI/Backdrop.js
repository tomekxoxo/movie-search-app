import React from "react";
import ReactDom from "react-dom";
import styled from "styled-components";

const StyledBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color:rgba(0,0,0,.7);
  z-index:-1;
}
`;

const Backdrop = (props) => {
  return ReactDom.createPortal(
    <StyledBackdrop>

    </StyledBackdrop>,
    document.getElementById("backdrop")
  );
};

export default Backdrop;
