import React from 'react'
import './loading.css'
import styled  from 'styled-components';
const Container = styled.div`
  position: absolute;
  z-index: 99999;
  width: 100vw;
  height: 100%;
  margin-top: -50px;
  padding-bottom: 50px;
  background-color: black;
  opacity: 0.2;
  overflow: hidden;
`
export default function Loading() {
  return (
    <>
    <Container>

    </Container>
    <span class="loader"></span>
    </>
  )
}
