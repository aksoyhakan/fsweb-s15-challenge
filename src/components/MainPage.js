import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const SCMainDiv = styled.div`
  max-width: 50rem;
  margin: 3rem auto;
  text-align: center;
`;

function MainPage() {
  const data = useSelector((store) => store.mainPage);
  console.log(data);
  return (
    <SCMainDiv>
      <img src={data.url} />
      <p
        style={{
          fontSize: "2rem",
          margin: "2rem",
          backgroundColor: "rgb(192,192,192)",
          padding: "1rem 2rem",
          borderRadius: "5%",
        }}
      >
        {data.description}
      </p>
    </SCMainDiv>
  );
}

export default MainPage;
