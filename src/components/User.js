import React from "react";
import styled from "styled-components";

const SCUserDiv = styled.div`
    max-width:50rem;
    font-size: 1.25rem;
    box-sizing:border-box;
    margin: 2rem auto;
    background-color: rgb(192,192,192);
    padding: 2rem 3rem;
    border-radius: 5%;
  }}`;
function User(props) {
  const { data } = props;

  return (
    <SCUserDiv>
      <p>User ID Number: {data.id}</p>
      <p>Username: {data.username}</p>
      <p>Role: {data.role}</p>
    </SCUserDiv>
  );
}

export default User;
