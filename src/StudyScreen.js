import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck } from './utils/api';

function StudyScreen() {
   const params = useParams();
  const deckId = params.deckId;
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
      } catch (error) {
        // Handle error (e.g., display an error message)
        console.error('Error loading deck:', error);
      }
    };

    loadDeck();
  }, [deckId]);

//  const handleFlip = () => {
//         setFlipped(!flipped);
       
//     };
 
//   const handleNext = () => {
//       if (cardIndex < deck.cards.length - 1) {
//       //const restart = window.confirm('Restart this deck?');
//        setCardIndex(cardIndex + 1);
        
// //         if (restart) {
// //             setCardIndex(0);
// //             setFlipped(false);
//         }else {history.push("/");
       
//       }
//   }
          
//   else{
//         //console.log("You just hit the next button on card:", cardId);
        
//         //console.log("You are now on card: ", cardId+1);
//         setFlipped(false);
//       }
//     };
  
  const hanldeNext= () => {
    if (cardIndex < deck.cards.length - 1) {
      setCardIndex(cardIndex + 1);
    } else {
      if (window.confirm("do you want to restart card?")) {
       setCardIndex(0);
      } else {
        history.push("/");
      }
    }
    setFlipped(false);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  if (!deck || deck.cards.length < 2) {
    return (
      

  <div className="container">
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        {deck && (
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
        )}
        <li className="breadcrumb-item">Study</li>
      </ol>
    </nav>

    {deck && ( // Check if deck is not null
      <div class="card text-center">
        <div class="card-header">
          Study: {deck.name}
        </div>
        <div class="card-body">
          <h5 class="card-title">Not Enough Cards!</h5>
          <p class="card-text">In order to study a deck, it needs to have at least 3 cards.</p>
        
        </div>
      </div>
    )}
  </div>

        
  );
  }



  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Study</li>
        </ol>
      </nav>

      <div className="card w-75">
        <div className="card-body">
          <h5 className="card-title">
            Card {cardIndex + 1} of {deck.cards.length}{" "}
          </h5>
          <p className="card-text">
            {flipped ? deck.cards[cardIndex].back : deck.cards[cardIndex].front}{" "}
          </p>
          <button className="btn btn-secondary mr-2" onClick={handleFlip}>
            Flip
          </button>

          {flipped && (
            <button className="btn btn-primary" onClick={hanldeNext}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudyScreen;