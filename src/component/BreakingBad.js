import React,{useState,useEffect} from 'react'
import BBTimeLineComponent from './BBTimeLineComponent';

const BreakingBad = () => {
    const [bbEpisodes, setBbEpisodes] = useState([]);
    const [bbCharacters, setBbCharacters] = useState([]);
    const [highlight, setHighlight] = useState();
  
    useEffect(() => {
      fetch("https://www.breakingbadapi.com/api/characters?category=Breaking+Bad")
        .then(response => response.ok && response.json())
        .then(characters => {
          setBbCharacters(
            characters.sort((a, b) => a.name.localeCompare(b.name))
          );
        })
        .catch(console.error);
    }, []);
  
    useEffect(() => {
      fetch("https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad")
        .then(response => response.ok && response.json())
        .then(episodes => {
          console.warn(episodes);
          setBbEpisodes(episodes);
        })
        .catch(console.error);
    }, []);

    console.log("bbEpisodeds",bbEpisodes);
  
    return (
      <React.Fragment>
        <h1>Breaking Bad Timeline</h1>
        <BBTimeLineComponent highlight={highlight} data={bbEpisodes} />
  
        <h2>Select your character</h2>
        <select value={highlight} onChange={e => setHighlight(e.target.value)}>
          <option>Select character</option>
          {bbCharacters.map(character => (
            <option key={character.name}>{character.name}</option>
          ))}
        </select>
      </React.Fragment>
    );
  }

export default BreakingBad
