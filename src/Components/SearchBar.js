import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [displayCard, setActivate] = useState([]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    setActivate([]);
    const newFilter = data.filter((value) => {
      return value.word.substr(0, searchWord.length).toLowerCase() === searchWord.toLowerCase()
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setActivate([]);
    setWordEntered("");
  };

  const cardState = (value) => {
    setWordEntered(value.word.toLowerCase())
    setActivate(value);
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0).map((value, key) => {
            return (
              <Button className="dataItem" sx={{
                ':hover': {
                  bgcolor: 'lightgrey',
                  color: 'black`',
                },
              }} value={value} onClick={() => cardState(value)} style={{justifyContent: "flex-start", textTransform: "none"}}>
                <Typography variant="h7" component="div" style={{marginLeft: "10px"}}>
                  {value.word}
                </Typography>
              </Button>
            );
          })}
        </div>
      )}
      <div>
        {displayCard.length !==0 && 
          <div className="cardComponent">
            <Card variant="outlined" sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Word
                </Typography>
                <Typography variant="h5" component="div">
                  {console.log(displayCard)}
                  {displayCard.word.toLowerCase()}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {displayCard.base_word.toLowerCase()}
                </Typography>
                <Typography variant="body2">
                {displayCard.definition.toLowerCase()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={()=> window.open(`https://en.wikipedia.org/wiki/${displayCard.word}`, "_blank")}>Learn More</Button>
              </CardActions>
            </Card>
          </div>
        }
      </div>
    </div>
  );
}

export default SearchBar;