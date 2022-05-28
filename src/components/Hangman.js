import React, { Component } from "react";
import "./Hangman.css";

import phase0 from "./image/hangman-0.jpg";
import phase1 from "./image/hangman-1.jpg";
import phase2 from "./image/hangman-2.jpg";
import phase3 from "./image/hangman-3.jpg";
import phase4 from "./image/hangman-4.jpg";
import phase5 from "./image/hangman-5.jpg";
import phase6 from "./image/hangman-6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [phase0, phase1, phase2, phase3, phase4, phase5, phase6],
  };

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set([]),
      answer: "reset",
      newWord: "",
    };
  }

  handleGuess = (e) => {
    let letter = e.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1),
    }));
  };

  guessedWord() {
    return this.state.answer
      .split("")
      .map((letter) => (this.state.guessed.has(letter) ? letter : " _ "));
  }

  generateButtons() {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
      <button
        class="btn btn-lg btn-primary m-2 btn-info"
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set([]),
      answer: "reset",
    });
  };

  setNewWord = () => {
    this.setState({
      answer: this.state.newWord.toUpperCase(),
    });
  };

  render() {
    const gameOver = this.state.mistake >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameStat = this.generateButtons();

    if (isWinner) {
      gameStat = "You Won!!!";
    }

    if (gameOver) {
      gameStat = "You Lost :(";
    }

    if (this.state.answer !== "reset") {
      return (
        <div className="Hangman container">
          <h1 className="text-center" style={{ color: "cyan", fontSize: 58 }}>
            Neon Hangman
          </h1>
          <div className="float-right">
            <h2 style={{ color: "white" }}>
              Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}
            </h2>
          </div>
          <div className="text-center ">
            <img src={this.props.images[this.state.mistake]} alt=""></img>
          </div>
          <div className="text-center">
            <h2 style={{ color: "white" }}>Guess the word!!!</h2>
            <h1 style={{ color: !gameOver ? "white" : "red", size: "150px" }}>
              {" "}
              {!gameOver ? this.guessedWord() : this.state.answer}{" "}
            </h1>
            <h1 style={{ color: "cyan" }}> {gameStat}</h1>
          </div>
          <button
            className="btn btn-light"
            onClick={this.resetButton}
            style={{
              width: 400,
              height: 50,
              fontSize: 20,
            }}
          >
            Set new word!
          </button>
        </div>
      );
    } else {
      return (
        <div className="Hangman container text-center">
          <h1 className="text-center" style={{ color: "cyan", fontSize: 58 }}>
            Neon Hangman
          </h1>
          <br />
          <br />
          <br />
          <br />
          <h2 style={{ color: "white" }}>Set the word to be guessed!</h2>
          <br />
          <br />
          <form>
            <div>
              <input
                type="string"
                class="get-word get-word:focus"
                style={{ width: 400, height: 60, fontSize: 40 }}
                onChange={(e) => this.setState({ newWord: e.target.value })}
                required
              ></input>
            </div>
            <br />
            <div>
              {" "}
              <button
                className="btn btn-primary btn-info"
                style={{
                  width: 400,
                  height: 60,
                  fontSize: 25,
                }}
                onClick={this.setNewWord}
              >
                Set Word
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default Hangman;
