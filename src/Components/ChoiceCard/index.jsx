import React from "react";
import styled from "styled-components";
import { mixins } from "../../themes/global.theme";

const ChoiceCardSec = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  input[type="checkbox"] {
    accent-color: var(--color-imp);
  }
  ._choiceId {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
    font-family: var(--ff-title);
    display: grid;
    place-items: center;
    font-weight: bold;
  }
  ._choice {
    font-family: var(--ff-subtitle);
    ${mixins.flexRowCenter};
    gap: 1rem;
  }
  ._imgChoice {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 0.25rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const MultipleChoiceCard = ({
  choice,
  onChoiceCheck,
  checkedState,
  checkSelected,
}) => {
  return (
    <ChoiceCardSec>
      <div className="_choice">
        <input
          className="_choiceId"
          type="checkbox"
          id={`choice-checkbox-${choice.id}`}
          name={choice.id}
          value={choice.id}
          checked={checkSelected ?? checkedState[choice.id]}
          onChange={() => onChoiceCheck(choice)}
        />
        <label htmlFor={`choice-checkbox-${choice.id}`}>{choice?.title}</label>
      </div>
    </ChoiceCardSec>
  );
};

export default MultipleChoiceCard;
