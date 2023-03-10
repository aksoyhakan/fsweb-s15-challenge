import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

const SCNavLinkHeaderDiv = styled.div`
  max-width: 50rem;
  box-sizing: content-box;
  margin: 0 auto;
  background-color: rgb(220, 220, 220, 0.2);
  border: 0.25rem solid black;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;

const SCNavLinkDiv = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  padding-top: 0.75rem;
`;

const SCNavLink = styled.p`
  padding: 0.5rem 1rem;
  border: 0.1rem solid rgb(175, 175, 175);
  background-color: rgb(200, 200, 200);
  color: black;
  margin-left: 0.5rem;
  border-radius: 0.2rem;
  transition: all 0.5s ease-out;

  &:hover {
    background-color: rgb(120, 120, 120);
    color: white;
  }
`;

function NavLinkHeader() {
  const data = useSelector((store) => store.navlinks);
  return (
    <SCNavLinkHeaderDiv>
      <NavLink style={{ textDecoration: "none", color: "black" }} to="/">
        <h1>Bilmeceler Dünyası</h1>
      </NavLink>
      <SCNavLinkDiv>
        {data.map((item) => (
          <NavLink style={{ textDecoration: "none" }} to={item.path}>
            <SCNavLink>{item.link}</SCNavLink>
          </NavLink>
        ))}
      </SCNavLinkDiv>
    </SCNavLinkHeaderDiv>
  );
}

export default NavLinkHeader;
