import React from "react";
import styled from "styled-components";

const SCRiddleDiv = styled.div`
    max-width:50rem;
    font-size: 1.25rem;
    box-sizing:border-box;
    margin: 2rem auto;
    background-color: rgb(192,192,192);
    padding: 2rem 3rem;
    border-radius: 5%;
  }}`;
function Riddle(props) {
  const { data } = props;

  return (
    <SCRiddleDiv>
      <p>Riddle Number: {data.id}</p>
      <p>Riddle: {data.riddle}</p>
    </SCRiddleDiv>
  );
}

export default Riddle;
