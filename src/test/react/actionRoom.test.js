import {
  PIECE_DOWN,
  PIECE_LEFT,
  PIECE_RIGHT,
  PIECE_SPACE,
  PIECE_ROTATE,
  NEXT_PIECE,
  SWITCH_PIECE,
  ADD_INDESTRUCTIBLES_LINES,
  SPECTRUMS,
  START_GAME,
  SPECTRUMS_SPECTATOR,
  SEND_INTERVAL_KEY_EVENT,
  WINNER_IS,
  CLEAR_INTERVAL_KEY_EVENT,
  GAME_FINISH
} from "../../client/actions/actionsTypes";
import {
  actionPieceDown,
  actionPieceLeft,
  actionPieceRight,
  actionPieceSpace,
  actionPieceRotate,
  actionNextPiece,
  actionSwitchPiece,
  actionIndestructiblesLines,
  actionSpectrum,
  actionSpectrumsSpectator,
  actionStartGame,
  actionSendIntervalKeyEvent,
  actionClearIntervalKeyEvent,
  actionWinnerIs,
  actionGameFinish
} from "../../client/actions/actionsRoom";

describe("ACTIONROOM.JS", () => {
  it("should return type pieceDown", () => {
    const action = { type: GAME_FINISH };
    expect(actionGameFinish()).toEqual(action);
  });

  it("should return type pieceDown", () => {
    const action = { type: PIECE_DOWN };
    expect(actionPieceDown()).toEqual(action);
  });

  it("should return type pieceLeft", () => {
    const action = { type: PIECE_LEFT };
    expect(actionPieceLeft()).toEqual(action);
  });

  it("should return type pieceRight", () => {
    const action = { type: PIECE_RIGHT };
    expect(actionPieceRight()).toEqual(action);
  });

  it("should return type pieceSpace", () => {
    const action = { type: PIECE_SPACE };
    expect(actionPieceSpace()).toEqual(action);
  });

  it("should return type pieceRotate", () => {
    const action = { type: PIECE_ROTATE };
    expect(actionPieceRotate()).toEqual(action);
  });

  it("should return type nextPiece", () => {
    const piece = [
      [".", ".", ".", "."],
      [".", "1", ".", "."],
      [".", "1", "1", "1"],
      [".", ".", ".", "."]
    ];
    const action = { type: NEXT_PIECE, piece };
    expect(actionNextPiece(piece)).toEqual(action);
  });

  it("should return type switchPiece", () => {
    const action = { type: SWITCH_PIECE };
    expect(actionSwitchPiece()).toEqual(action);
  });

  it("should return type addIndesctructiblesLines", () => {
    const nbrLines = 5;
    const action = { type: ADD_INDESTRUCTIBLES_LINES, nbrLines };
    expect(actionIndestructiblesLines(nbrLines)).toEqual(action);
  });

  it("should return type spectrums", () => {
    const spectrum = [
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]
    ];
    const action = { type: SPECTRUMS, spectrum };
    expect(actionSpectrum(spectrum)).toEqual(action);
  });

  it("should return type spectrumsSpectator", () => {
    const listSpectrums = [
      [
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]
      ]
    ];
    const action = { type: SPECTRUMS_SPECTATOR, listSpectrums };
    expect(actionSpectrumsSpectator(listSpectrums)).toEqual(action);
  });

  it("should return type startGame", () => {
    const listPlayers = [];
    const listPieces = [];
    const action = { type: START_GAME, listPlayers, listPieces };
    expect(actionStartGame(listPlayers, listPieces)).toEqual(action);
  });

  it("should return type sendIntervalKeyEvent", () => {
    const clearInterval = 42;
    const eventListner = new Event("test");
    const action = {
      type: SEND_INTERVAL_KEY_EVENT,
      clearInterval,
      eventListner
    };
    expect(actionSendIntervalKeyEvent(clearInterval, eventListner)).toEqual(
      action
    );
  });

  it("should return type clearIntervalKeyEvent", () => {
    const action = { type: CLEAR_INTERVAL_KEY_EVENT };
    expect(actionClearIntervalKeyEvent()).toEqual(action);
  });

  it("should return type winnerIs", () => {
    const action = { type: WINNER_IS };
    expect(actionWinnerIs()).toEqual(action);
  });
});
