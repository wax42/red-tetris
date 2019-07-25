import { PLAY_GAME } from "./actionTypes";

export function playGame() {
  return { type: PLAY_GAME, text: "Begin to play" };
}

export function actionClick() {
  console.log("actionClick");
  return { type: "RER", name: "yoyo", text: "Cliiick" };
}
