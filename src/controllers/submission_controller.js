const Submission = require('../models/submission_model');

async function submit(roomId, player, questionNumber, response, correct) {
  const existingSubmission = await Submission.findOne({ roomId, player, questionNumber });
  if (existingSubmission) {
    throw new Error('This player has already submitted a response to this question');
  }

  const newSubmission = new Submission({
    roomId,
    player,
    response,
    questionNumber,
    correct,
  });
  await newSubmission.save();

  return newSubmission;
}

async function countSubmissions(roomId, questionNumber) {
  // see if all players have submitted and update the game state as necessary / has to be after submission is saved
  const numSubmissions = await Submission.countDocuments({ roomId, questionNumber });

  return numSubmissions;
}

// computes scores for all players in a room
async function getScores(roomId, currentQuestionNumber, players) {
  const submissions = await Submission.find({ roomId });

  const scores = {};
  players.forEach((player) => {
    scores[player] = 0;
  });

  submissions.forEach((submission) => {
    // don't count unfinished rounds
    if (submission.questionNumber < currentQuestionNumber && submission.correct) {
      scores[submission.player] += 1;
    }
  });

  const sorted = Object.entries(scores).sort((a, b) => { return b[1] - a[1]; });

  return sorted;
}

module.exports = {
  submit,
  countSubmissions,
  getScores,
};
