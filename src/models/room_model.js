const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomStates = {
  IN_PROGRESS: 'IN_PROGRESS',
  CLOSED: 'CLOSED',
  GAME_OVER: 'GAME_OVER',
  OPEN: 'OPEN',
};

const RoomSchema = new Schema({
  creator: String,
  questions: [{ prompt: String, answer: String }],
  players: [String],
  roomKey: String,
  status: { type: String, enum: Object.values(RoomStates), default: RoomStates.CLOSED },
  currentQuestionNumber: { type: Number, default: 0 },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

RoomSchema.virtual('id').get(function() {
  return this._id;
});

const RoomModel = mongoose.model('Room', RoomSchema);

module.exports = RoomModel;
module.exports.RoomStates = RoomStates;
