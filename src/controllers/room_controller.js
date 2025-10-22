const Room = require('../models/room_model');
const RoomStates = require('../models/room_model').RoomStates;
const { submit, getScores, countSubmissions } = require('./submission_controller');

async function createRoom(roomInitInfo) {
  const newRoom = new Room();
  newRoom.creator = roomInitInfo.creator;
  newRoom.questions = roomInitInfo.questions;
  newRoom.players = [];
  newRoom.status = RoomStates.CLOSED;
  newRoom.currentQuestionNumber = 0;
  newRoom.roomKey = roomInitInfo.roomKey;

  return newRoom.save();
}

async function joinRoom(roomId, playerInfo) {
  const room = await Room.findById(roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  const newPlayerName = playerInfo.name;
  const existingPlayers = room.players;

  if (existingPlayers.includes(newPlayerName)) {
    throw new Error(`Player with your intended name (${newPlayerName}) already exists`);
  }

  if (room.status !== RoomStates.OPEN) {
    throw new Error(`This room is not open for joining in state ${room.status}`);
  }

  room.players.push(newPlayerName);
  return room.save();
}

async function changeStatus(roomId, roomKey, status) {
  const room = await Room.findById(roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  if (room.roomKey !== roomKey) {
    throw new Error('Room key is incorrect');
  }

  if (status in RoomStates) {
    room.status = status;
  } else {
    throw new Error(`Invalid status. Must be ${RoomStates.CLOSED}, ${RoomStates.OPEN}, ${RoomStates.IN_PROGRESS} or ${RoomStates.GAME_OVER}`);
  }

  return room.save();
}

async function getState(roomId, player) {
  const room = await Room.findById(roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  const scores = await getScores(roomId, room.currentQuestionNumber, room.players);
  const topThree = scores.slice(0, 3);

  const requestingPlayerScoreboardPosition = scores.findIndex((entry) => { return entry[0] === player; });

  const gameOver = room.currentQuestionNumber >= room.questions.length;

  const state = {
    id: room._id,
    roomId: room._id,
    status: room.status,
    players: room.players,
    yourName: player,
    yourRank: requestingPlayerScoreboardPosition === -1 ? null : requestingPlayerScoreboardPosition + 1,
    top3: topThree,
    currentQuestionNumber: gameOver ? -1 : room.currentQuestionNumber,
    currentQuestion: gameOver ? null : room.questions[room.currentQuestionNumber].prompt,
    roomKey: room.roomKey,
  };

  return state;
}

async function submitAnswer(roomId, player, response) {
  const room = await Room.findById(roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  if (room.status !== RoomStates.IN_PROGRESS) {
    throw new Error('This game is not in progress. Can\'t submit now.');
  }

  if (!room.players.includes(player)) {
    throw new Error(`Player (${player}) not in room`);
  }

  const isCorrect = room.questions[room.currentQuestionNumber].answer === response;

  const newSubmission = await submit(roomId, player, room.currentQuestionNumber, response, isCorrect);
  const numSubmissions = await countSubmissions(roomId, room.currentQuestionNumber);

  if (numSubmissions === room.players.length) {
    room.currentQuestionNumber += 1;
  }

  if (room.currentQuestionNumber >= room.questions.length) {
    room.status = RoomStates.GAME_OVER;
  }

  await room.save();

  return newSubmission;
}

async function forceNextQuestion(roomId, roomKey) {
  const room = await Room.findById(roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  if (room.roomKey !== roomKey) {
    throw new Error('Room key is incorrect');
  }

  if (room.status !== RoomStates.IN_PROGRESS) {
    throw new Error('This game is not in progress. Can\'t force next question.');
  }

  room.currentQuestionNumber += 1;

  if (room.currentQuestionNumber >= room.questions.length) {
    room.status = RoomStates.GAME_OVER;
  }

  await room.save();

  return { success: true, message: 'Forced next question' };
}

module.exports = {
  createRoom,
  joinRoom,
  changeStatus,
  getState,
  submitAnswer,
  forceNextQuestion,
};
