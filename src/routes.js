const { Router } = require('express');
const Rooms = require('./controllers/room_controller');

const router = Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Welcome to the kahoot API!' });
});

router.post('/rooms', async (req, res) => {
  const roomInitInfo = req.body;

  try {
    const result = await Rooms.createRoom(roomInitInfo);
    return res.json(result);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
});

router.get('/rooms/:id', async (req, res) => {
  const roomId = req.params.id;
  const { player } = req.query;

  try {
    const result = await Rooms.getState(roomId, player);
    return res.json(result);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
});

router.post('/rooms/:id', async (req, res) => {
  const roomId = req.params.id;
  const playerInfo = req.body;

  try {
    const result = await Rooms.joinRoom(roomId, playerInfo);
    return res.json(result);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
});

router.patch('/rooms/:id', async (req, res) => {
  const roomId = req.params.id;
  const { roomKey, status } = req.body;

  try {
    const result = await Rooms.changeStatus(roomId, roomKey, status);
    return res.json(result);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
});

router.post('/rooms/:id/submissions', async (req, res) => {
  const roomId = req.params.id;
  const { player, response, roomKey, force } = req.body;

  try {
    if (force && roomKey) {
      const result = await Rooms.forceNextQuestion(roomId, roomKey);
      return res.json(result);
    } else {
      const result = await Rooms.submitAnswer(roomId, player, response);
      return res.json(result);
    }
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
});

module.exports = router;
