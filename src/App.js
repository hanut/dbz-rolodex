import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CardList } from './components/card-list/card-list';
import { SearchBox } from './components/search-box/search-box';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      mode: 'good-guys',
      goodGuys: [],
      badGuys: [],
      searchText: ''
    }
  }

  componentDidMount() {
    let headers = {
      "secret-key": "$2b$10$da8v3mD22/yGiVZ7mMQ.muhu2aCXvZBeswrzZH818ppDSQFBMCXmm"
    };
    fetch("https://api.jsonbin.io/b/5e54f5fab383ea294aef3e65", { headers })
      .then(res => res.json()).then(goodGuys => this.setState({ goodGuys }))
      .catch(error => {
        console.log(error);
      });
    fetch("https://api.jsonbin.io/b/5e54f6c80a22af292e0e9bac", { headers })
      .then(res => res.json()).then(badGuys => this.setState({ badGuys }))
      .catch(error => {
        console.log(error);
      });
  }

  toggle = () => {
    let { mode } = this.state;
    if (mode === 'good-guys') {
      mode = 'bad-guys'
    } else {
      mode = 'good-guys'
    }
    this.setState({ mode });
  }

  handleSearch = (e) => {
    this.setState({ searchText: e.currentTarget.value })
  }

  render() {
    const { goodGuys, badGuys, searchText, mode } = this.state;
    const foundPeople = (mode === 'good-guys') ? goodGuys.filter(p =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    ) : badGuys.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()));
    return (
      <div className="App">
        <div className="topLogoHolder">
          <img src={logo} style={{ height: "120px", margin: "1rem auto" }} alt="DBZ" />
        </div>
        <h1>Dragonball Rolodex</h1>
        <SearchBox
          placeholder={`search for a ${this.state.mode === 'good-guys' ? 'hero' : 'villain'}...`}
          onChange={this.handleSearch}
        />
        <br />
        <button onClick={this.toggle}>Toggle Mode</button>
        {this.state.mode === 'good-guys' ?
          <section >
            <h2>Good Guys</h2>
            <CardList people={foundPeople} />
          </section>
          :
          <section>
            <h2>Bad Guys</h2>
            <CardList people={foundPeople} />
          </section>
        }
      </div>
    );
  }
}

export default App;
