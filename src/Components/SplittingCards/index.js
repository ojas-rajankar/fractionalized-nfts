import React, { useEffect } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
ul.cards {
  width: 660px;
  margin: 0 auto 20px;
  height: 300px;
  list-style-type: none;
  position: relative;
  padding: 20px 0;
  cursor: pointer;
}
ul.cards li.title {
  margin: 0 0 20px;
}
ul.cards li.title h2 {
  font-weight: 700;
}
ul.cards li.card {
  background: #FFF;
  overflow: hidden;
  height: 200px;
  width: 200px;
  border-radius: 10px;
  position: absolute;
  left: 0px;
  box-shadow: 1px 2px 2px 0 #aaa;
  -webkit-transition: all 0.4s cubic-bezier(0.63, 0.15, 0.03, 1.12);
  transition: all 0.4s cubic-bezier(0.63, 0.15, 0.03, 1.12);
}
ul.cards li.card img {
  max-width: 100%;
  height: auto;
}
ul.cards li.card div.content {
  padding: 5px 10px;
}
ul.cards li.card.card-1 {
  z-index: 10;
  -webkit-transform: rotateZ(-2deg);
          transform: rotateZ(-2deg);
}
ul.cards li.card.card-2 {
  z-index: 9;
  -webkit-transform: rotateZ(-7deg);
          transform: rotateZ(-7deg);
  -webkit-transition-delay: 0.05s;
          transition-delay: 0.05s;
}
ul.cards li.card.card-3 {
  z-index: 8;
  -webkit-transform: rotateZ(5deg);
          transform: rotateZ(5deg);
  -webkit-transition-delay: 0.1s;
          transition-delay: 0.1s;
}
ul.cards.transition li.card {
  -webkit-transform: rotateZ(0deg);
          transform: rotateZ(0deg);
}
ul.cards.transition li.card.card-1 {
  left: 440px;
}
ul.cards.transition li.card.card-2 {
  left: 220px;
}

ul.card-stacks {
  width: 660px;
  list-style-type: none;
  margin: 0 auto 20px;
  padding: 0;
  position: relative;
  cursor: pointer;
  height: 700px;
}
ul.card-stacks li.title {
  margin: 0 0 20px;
}
ul.card-stacks li.title h2 {
  font-weight: 700;
}
ul.card-stacks li.stack {
  position: absolute;
  left: 0px;
  -webkit-transition: all 0.4s cubic-bezier(0.63, 0.15, 0.03, 1.02);
  transition: all 0.4s cubic-bezier(0.63, 0.15, 0.03, 1.02);
}
ul.card-stacks li.stack ul.cards-down {
  position: relative;
  margin: 0 0 20px;
  padding: 20px;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
ul.card-stacks li.stack ul.cards-down li.card {
  -webkit-transition: all 0.4s cubic-bezier(0.63, 0.15, 0.03, 1.22);
  transition: all 0.4s cubic-bezier(0.63, 0.15, 0.03, 1.22);
  left: 0px;
  -webkit-transition-delay: 0.4s;
          transition-delay: 0.4s;
  background: #FFF;
  overflow: hidden;
  height: 200px;
  width: 200px;
  border-radius: 10px;
  position: absolute;
  top: 0px;
  box-shadow: 1px 2px 2px 0 #aaa;
}
ul.card-stacks li.stack ul.cards-down li.card img {
  max-width: 100%;
  height: auto;
}
ul.card-stacks li.stack ul.cards-down li.card div.content {
  padding: 5px 10px;
}
ul.card-stacks li.stack ul.cards-down li.card.card-1 {
  z-index: 10;
  -webkit-transform: rotateZ(-2deg);
          transform: rotateZ(-2deg);
}
ul.card-stacks li.stack ul.cards-down li.card.card-2 {
  z-index: 9;
  -webkit-transform: rotateZ(-7deg);
          transform: rotateZ(-7deg);
}
ul.card-stacks li.stack ul.cards-down li.card.card-3 {
  z-index: 8;
  -webkit-transform: rotateZ(5deg);
          transform: rotateZ(5deg);
}
ul.card-stacks.transition li.stack.stack-1 {
  left: 0px;
}
ul.card-stacks.transition li.stack.stack-2 {
  left: 220px;
}
ul.card-stacks.transition li.stack.stack-3 {
  left: 440px;
}
ul.card-stacks.transition li.stack ul.cards-down li.card {
  -webkit-transform: rotateZ(0deg);
          transform: rotateZ(0deg);
}
ul.card-stacks.transition li.stack ul.cards-down li.card.card-1 {
  top: 440px;
}
ul.card-stacks.transition li.stack ul.cards-down li.card.card-2 {
  top: 220px;
}

ul.cards-split {
  width: 660px;
  height: 280px;
  list-style-type: none;
  position: relative;
  margin: 0 auto 20px;
  padding: 20px;
  cursor: pointer;
}
ul.cards-split li.title {
  margin: 0 0 20px;
}
ul.cards-split li.title h2 {
  font-weight: 700;
}
ul.cards-split li.card {
  background: #FFF;
  overflow: hidden;
  height: 200px;
  width: 200px;
  border-radius: 10px;
  position: absolute;
  left: 220px;
  box-shadow: 1px 2px 2px 0 #aaa;
  -webkit-transition: all 0.4s cubic-bezier(0.63, 0.15, 0.03, 1.12);
  transition: all 0.4s cubic-bezier(0.63, 0.15, 0.03, 1.12);
}
ul.cards-split li.card img {
  max-width: 100%;
  height: auto;
}
ul.cards-split li.card div.content {
  padding: 5px 10px;
}
ul.cards-split li.card.card-1 {
  z-index: 10;
  -webkit-transform: rotateZ(-2deg);
          transform: rotateZ(-2deg);
}
ul.cards-split li.card.card-2 {
  z-index: 9;
  -webkit-transform: rotateZ(-7deg);
          transform: rotateZ(-7deg);
  -webkit-transition-delay: 0.05s;
          transition-delay: 0.05s;
}
ul.cards-split li.card.card-3 {
  z-index: 8;
  -webkit-transform: rotateZ(5deg);
          transform: rotateZ(5deg);
  -webkit-transition-delay: 0.1s;
          transition-delay: 0.1s;
}
ul.cards-split.transition li.card {
  -webkit-transform: rotateZ(0deg);
          transform: rotateZ(0deg);
}
ul.cards-split.transition li.card.card-1 {
  left: 0px;
}
ul.cards-split.transition li.card.card-2 {
  left: 440px;
}
ul.cards-split.transition li.card.card-3 {
  left: 220px;
}

ul.cards-split-delay {
  width: 660px;
  height: 280px;
  list-style-type: none;
  position: relative;
  margin: 0 auto 20px;
  padding: 20px;
  cursor: pointer;
}
ul.cards-split-delay li.title {
  margin: 0 0 20px;
}
ul.cards-split-delay li.title h2 {
  font-weight: 700;
}
ul.cards-split-delay li.card {
  background: #FFF;
  overflow: hidden;
  height: 200px;
  width: 200px;
  border-radius: 10px;
  position: absolute;
  left: 220px;
  box-shadow: 1px 2px 2px 0 #aaa;
  -webkit-transition: all 0.4s cubic-bezier(0.63, 0.15, 0.03, 1.12);
  transition: all 0.4s cubic-bezier(0.63, 0.15, 0.03, 1.12);
}
ul.cards-split-delay li.card img {
  max-width: 100%;
  height: auto;
}
ul.cards-split-delay li.card div.content {
  padding: 5px 10px;
}
ul.cards-split-delay li.card.card-1 {
  z-index: 10;
  -webkit-transform: rotateZ(-2deg);
          transform: rotateZ(-2deg);
}
ul.cards-split-delay li.card.card-2 {
  z-index: 9;
  -webkit-transform: rotateZ(-7deg);
          transform: rotateZ(-7deg);
  -webkit-transition-delay: 0.6s;
          transition-delay: 0.6s;
}
ul.cards-split-delay li.card.card-3 {
  z-index: 8;
  -webkit-transform: rotateZ(5deg);
          transform: rotateZ(5deg);
  -webkit-transition-delay: 0s;
          transition-delay: 0s;
}
ul.cards-split-delay.transition li.card {
  -webkit-transform: rotateZ(0deg);
          transform: rotateZ(0deg);
}
ul.cards-split-delay.transition li.card.card-1 {
  left: 0px;
}
ul.cards-split-delay.transition li.card.card-2 {
  left: 440px;
}
ul.cards-split-delay.transition li.card.card-3 {
  left: 220px;
  -webkit-transition-delay: 0.6s;
          transition-delay: 0.6s;
}
`

const SplittingCards = () => {

  useEffect(() => {
    document.querySelector('ul.cards-split-delay').addEventListener('click', function () {
      document.querySelector('ul.cards-split-delay').classList.toggle('transition');
    });
  }, [])


  return (
    <Wrapper>
      <ul class="cards-split-delay" >
        <li class="title">
          <h2>Delayed split from middle</h2>
        </li>
        <li class="card card-1"><img src="http://lorempixel.com/400/250/city" style={{ display: "none" }} />
          <div class="content">
            <h1>Card 1</h1>
            <p>Card description</p>
          </div>
        </li>
        <li class="card card-2"><img src="http://lorempixel.com/400/250/food" style={{ display: "none" }} />
          <div class="content">
            <h1>Card 2</h1>
            <p>Card description</p>
          </div>
        </li>
        <li class="card card-3"><img src="http://lorempixel.com/400/250/animals" style={{ display: "none" }} />
          <div class="content">
            <h1>Card 3</h1>
            <p>Card description</p>
          </div>
        </li>
      </ul>
    </Wrapper>
  )
}

export default SplittingCards