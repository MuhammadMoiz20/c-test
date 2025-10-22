const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubmissionSchema = new Schema({
  roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
  player: { type: String, required: true },
  response: { type: String, required: true },
  questionNumber: { type: Number, required: true },
  correct: { type: Boolean, required: true },
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

const SubmissionModel = mongoose.model('Submission', SubmissionSchema);

module.exports = SubmissionModel;
module.exports.SubmissionSchema = SubmissionSchema;
