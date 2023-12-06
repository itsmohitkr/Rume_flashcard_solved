import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listDecks, deleteDeck } from '../utils/api/index';

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const loadDecks = async () => {
      try {
        const loadedDecks = await listDecks();
        setDecks(loadedDecks);
      } catch (error) {
        // Handle error (e.g., display an error message)
        console.error('Error loading decks:', error);
      }
    };

    loadDecks();
  }, []);

  const handleDeleteDeck = async (deckId) => {
    if (window.confirm('Delete this deck?')) {
      try {
        await deleteDeck(deckId);
        setDecks(decks.filter((deck) => deck.id !== deckId));
      } catch (error) {
        // Handle error (e.g., display an error message)
        console.error('Error deleting deck:', error);
      }
    }
  };

  return (
    <div>
      <h2>Decks</h2>
      <Link to="./decks/new" className="btn btn-primary mb-2">
        Create Deck
      </Link>
      <div className="card-deck">
        {decks.map((deck) => (
          <div key={deck.id} className="card">
            <div className="card-body">
              <h5 className="card-title">{deck.name}</h5>
               <h6 className="card-subtitle mb-2 text-muted">
                {deck.cards.length} cards
              </h6>
              <p className="card-text">{deck.description}</p>
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
                View
              </Link>
              <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
                Study
              </Link>
              <button className="btn btn-danger" onClick={() => handleDeleteDeck(deck.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;