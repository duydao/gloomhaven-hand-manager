import React from 'react'

function HandSelection({
  addCardToHand,
  character,
  level,
  hand,
  handleUpdateCharacter,
  handleSetStage,
  removeCardFromHand,
}) {
  const firstRow = character.cards.slice(0, 5)
  const secondRow = character.cards.slice(5, 10)
  const thirdRow = character.cards.slice(10, character.startingCards)
  const levelTwoCards = character.cards.filter((card) => {
    return card.level === 2
  })
  const levelThreeCards = character.cards.filter((card) => {
    return card.level === 3
  })
  const levelFourCards = character.cards.filter((card) => {
    return card.level === 4
  })
  const levelFiveCards = character.cards.filter((card) => {
    return card.level === 5
  })
  const levelSixCards = character.cards.filter((card) => {
    return card.level === 6
  })
  const levelSevenCards = character.cards.filter((card) => {
    return card.level === 7
  })
  const levelEightCards = character.cards.filter((card) => {
    return card.level === 8
  })
  const levelNineCards = character.cards.filter((card) => {
    return card.level === 9
  })
  const enhancementOptions = [
    '+1',
    'Leap',
    'Wind',
    'Ice',
    'Fire',
    'Leaf',
    'Sun',
    'Moon',
    'Wild Element',
    'Bless',
    'Curse',
    'Disarm',
    'Immobilize',
    'Wound',
    'Muddle',
    'Poison',
    'Strengthen',
    'Area',
  ]

  //TODO: Add a cardClicked function. Should check if card is in hand. If not, call addCardToHand. If it is, remove it from hand

  function cardIsInHand(cardToCheck) {
    if (hand.some((card) => card.title === cardToCheck.title)) {
      return true
    }
    return false
  }

  function handleEnhancementChange(cardTitle, id, e) {
    let updatedData = { ...character }
    const card = updatedData.cards.find((card) => card.title === cardTitle)
    let enhancement = card.enhancements.find(
      (enhancement) => enhancement.id === id
    )
    enhancement.enhancement = e.target.value
    handleUpdateCharacter(updatedData)
  }

  function handleCardClick(selectedCard) {
    let cardFromCharacter = character.cards.find(
      (card) => card.title === selectedCard.alt
    )
    if (cardIsInHand(cardFromCharacter)) {
      removeCardFromHand(cardFromCharacter)
    } else {
      if (hand.length < character.handSize) {
        addCardToHand(cardFromCharacter)
      } else {
        console.log(`Can't add more cards to your hand`)
      }
    }
  }

  return (
    <div id="initial-table" className="cardSet">
      <h2 id="choose-cards-number" className="header">
        Choose {character.handSize} Cards
      </h2>
      <div align="center">
        <p id="card-counter" className="card-counter" align="center">
          {hand.length}/{character.handSize}
        </p>
      </div>
      <table className="cardTable" align="center">
        <tbody>
          <CardTableRowLevelOne
            cardIsInHand={cardIsInHand}
            handleCardClick={handleCardClick}
            cardSet={firstRow}
            character={character}
            enhancementOptions={enhancementOptions}
            handleEnhancementChange={handleEnhancementChange}
          />
          <CardTableRowLevelOne
            cardIsInHand={cardIsInHand}
            handleCardClick={handleCardClick}
            cardSet={secondRow}
            character={character}
            enhancementOptions={enhancementOptions}
            handleEnhancementChange={handleEnhancementChange}
          />
          <CardTableRowLevelOne
            cardIsInHand={cardIsInHand}
            handleCardClick={handleCardClick}
            cardSet={thirdRow}
            character={character}
            enhancementOptions={enhancementOptions}
            handleEnhancementChange={handleEnhancementChange}
          />
          {level >= 2 && (
            <CardTableRowTwoLevels
              cardIsInHand={cardIsInHand}
              handleCardClick={handleCardClick}
              character={character}
              enhancementOptions={enhancementOptions}
              handleEnhancementChange={handleEnhancementChange}
              firstCardSet={levelTwoCards}
              firstLevel={2}
              level={level}
              secondCardSet={levelThreeCards}
              secondLevel={3}
            />
          )}
          {level >= 4 && (
            <CardTableRowTwoLevels
              cardIsInHand={cardIsInHand}
              handleCardClick={handleCardClick}
              character={character}
              enhancementOptions={enhancementOptions}
              handleEnhancementChange={handleEnhancementChange}
              firstCardSet={levelFourCards}
              firstLevel={4}
              level={level}
              secondCardSet={levelFiveCards}
              secondLevel={5}
            />
          )}
          {level >= 6 && (
            <CardTableRowTwoLevels
              cardIsInHand={cardIsInHand}
              handleCardClick={handleCardClick}
              character={character}
              enhancementOptions={enhancementOptions}
              handleEnhancementChange={handleEnhancementChange}
              firstCardSet={levelSixCards}
              firstLevel={6}
              level={level}
              secondCardSet={levelSevenCards}
              secondLevel={7}
            />
          )}
          {level >= 8 && (
            <CardTableRowTwoLevels
              cardIsInHand={cardIsInHand}
              handleCardClick={handleCardClick}
              character={character}
              enhancementOptions={enhancementOptions}
              handleEnhancementChange={handleEnhancementChange}
              firstCardSet={levelEightCards}
              firstLevel={8}
              level={level}
              secondCardSet={levelNineCards}
              secondLevel={9}
            />
          )}
        </tbody>
      </table>
      <div>
        <SelectedHand character={character} hand={hand} />
      </div>
      <div align="center">
        <button
          className="button"
          type="button"
          onClick={() => handleSetStage('selectPerks')}
        >
          Go Back To Perks
        </button>
        <button
          className="button"
          type="button"
          title="Must Have a Full Hand"
          onClick={() => handleSetStage('playing')}
          disabled={hand.length < character.handSize}
        >
          Confirm Hand
        </button>
      </div>
    </div>
  )
}

function CardTableRowLevelOne({
  cardIsInHand,
  handleCardClick,
  cardSet,
  character,
  enhancementOptions,
  handleEnhancementChange,
}) {
  return (
    <>
      <tr>
        <td className="level">Level 1:</td>
        {cardSet.map((card) => {
          return (
            <td
              key={card.title}
              className="chooseCardsTable"
              onClick={(e) => handleCardClick(e.target)}
            >
              <img
                src={`./images/character-ability-cards/${character.initials}/${card.title}.png`}
                className={
                  cardIsInHand(card) ? 'chooseCards add-border' : 'chooseCards'
                }
                alt={card.title}
              />
              {card.enhancements.map((enhancement) => (
                <EnhancementIcon
                  key={enhancement.id}
                  enhancement={enhancement}
                />
              ))}
            </td>
          )
        })}
      </tr>
      <tr>
        <td className="enhancement-label" />
        {cardSet.map((card) => {
          return (
            <td key={`${card.title}-Enhancements`} className="enhancement">
              {card.enhancements.map((enhancement, index) => {
                return (
                  <div
                    key={`${card.title}-${index}`}
                    className="enhancement-row"
                  >
                    <label className="enhancement">Enhancement:</label>
                    <select
                      onChange={(e) =>
                        handleEnhancementChange(card.title, enhancement.id, e)
                      }
                    >
                      <option value="none">None</option>
                      {enhancementOptions.map((enhancementOption) => {
                        return (
                          <option
                            key={enhancementOption}
                            value={enhancementOption}
                          >
                            {enhancementOption}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                )
              })}
            </td>
          )
        })}
      </tr>
    </>
  )
}

function CardTableRowTwoLevels({
  cardIsInHand,
  handleCardClick,
  character,
  enhancementOptions,
  handleEnhancementChange,
  firstCardSet,
  firstLevel,
  level,
  secondCardSet,
  secondLevel,
}) {
  return (
    <>
      <tr>
        <td className="level">Level {firstLevel}:</td>
        {firstCardSet.map((card) => {
          return (
            <td
              key={card.title}
              className="chooseCardsTable"
              onClick={(e) => handleCardClick(e.target)}
            >
              <img
                src={`./images/character-ability-cards/${character.initials}/${card.title}.png`}
                className={
                  cardIsInHand(card) ? 'chooseCards add-border' : 'chooseCards'
                }
                alt={card.title}
              />
              {card.enhancements.map((enhancement) => (
                <EnhancementIcon
                  key={enhancement.id}
                  enhancement={enhancement}
                />
              ))}
            </td>
          )
        })}
        {level >= secondLevel && (
          <>
            <td className="level">Level {secondLevel}:</td>
            {secondCardSet.map((card) => {
              return (
                <td
                  key={card.title}
                  className="chooseCardsTable"
                  onClick={(e) => handleCardClick(e.target)}
                >
                  <img
                    src={`./images/character-ability-cards/${character.initials}/${card.title}.png`}
                    className={
                      cardIsInHand(card)
                        ? 'chooseCards add-border'
                        : 'chooseCards'
                    }
                    alt={card.title}
                  />
                  {card.enhancements.map((enhancement) => (
                    <EnhancementIcon
                      key={enhancement.id}
                      enhancement={enhancement}
                    />
                  ))}
                </td>
              )
            })}
          </>
        )}
      </tr>
      <tr>
        <td className="enhancement-label" />
        {firstCardSet.map((card) => {
          return (
            <td key={`${card.title}-Enhancements`} className="enhancement">
              {card.enhancements.map((enhancement, index) => {
                return (
                  <div
                    key={`${card.title}-${index}`}
                    className="enhancement-row"
                  >
                    <label className="enhancement">Enhancement:</label>
                    <select
                      onChange={(e) =>
                        handleEnhancementChange(card.title, enhancement.id, e)
                      }
                    >
                      <option value="none">None</option>
                      {enhancementOptions.map((enhancementOption) => {
                        return (
                          <option
                            key={enhancementOption}
                            value={enhancementOption}
                          >
                            {enhancementOption}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                )
              })}
            </td>
          )
        })}
        {level >= secondLevel && (
          <>
            <td className="enhancement-label" />
            {secondCardSet.map((card) => {
              return (
                <td key={`${card.title}-Enhancements`} className="enhancement">
                  {card.enhancements.map((enhancement, index) => {
                    return (
                      <div
                        key={`${card.title}-${index}`}
                        className="enhancement-row"
                      >
                        <label className="enhancement">Enhancement:</label>
                        <select
                          onChange={(e) =>
                            handleEnhancementChange(
                              card.title,
                              enhancement.id,
                              e
                            )
                          }
                        >
                          <option value="none">None</option>
                          {enhancementOptions.map((enhancementOption) => {
                            return (
                              <option
                                key={enhancementOption}
                                value={enhancementOption}
                              >
                                {enhancementOption}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                    )
                  })}
                </td>
              )
            })}
          </>
        )}
      </tr>
    </>
  )
}

function SelectedHand({ character, hand }) {
  const firstRow = hand.slice(0, 4)
  const secondRow = hand.slice(4, 8)
  const thirdRow = hand.slice(8, 12)
  return (
    <table align="center">
      <tbody>
        <tr>
          {firstRow.map((card) => {
            return (
              <td key={card.title} className="hand">
                <img
                  src={`./images/character-ability-cards/${character.initials}/${card.title}.png`}
                  className="chooseCards"
                  alt={card.title}
                />
                {card.enhancements.map((enhancement) => (
                  <EnhancementIcon
                    key={enhancement.id}
                    enhancement={enhancement}
                  />
                ))}
              </td>
            )
          })}
        </tr>
        <tr>
          {secondRow.map((card) => {
            return (
              <td key={card.title} className="hand">
                <img
                  src={`./images/character-ability-cards/${character.initials}/${card.title}.png`}
                  className="chooseCards"
                  alt={card.title}
                />
                {card.enhancements.map((enhancement) => (
                  <EnhancementIcon
                    key={enhancement.id}
                    enhancement={enhancement}
                  />
                ))}
              </td>
            )
          })}
        </tr>
        <tr>
          {thirdRow.map((card) => {
            return (
              <td key={card.title} className="hand">
                <img
                  src={`./images/character-ability-cards/${character.initials}/${card.title}.png`}
                  className="chooseCards"
                  alt={card.title}
                />
                {card.enhancements.map((enhancement) => (
                  <EnhancementIcon
                    key={enhancement.id}
                    enhancement={enhancement}
                  />
                ))}
              </td>
            )
          })}
        </tr>
      </tbody>
    </table>
  )
}

function EnhancementIcon({ enhancement }) {
  return (
    <>
      {enhancement.enhancement !== '' && (
        <img
          className="enhancement-icon"
          src={`./images/enhancements/${enhancement.enhancement}.png`}
          style={{ top: enhancement.top, left: enhancement.left }}
          alt={`Enhancement Name`}
        />
      )}
    </>
  )
}

export default HandSelection