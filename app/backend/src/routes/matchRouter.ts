import { Router } from 'express';
import matchController from '../controllers/matchController';

const matchRouter = Router();

matchRouter.post('/', (req, res) => matchController.add(req, res));
matchRouter.get('/', (req, res) => matchController.get(req, res));
matchRouter.patch('/:id/finish', (req, res) => matchController.finish(req, res));
matchRouter.patch('/:id', (req, res) => matchController.update(req, res));

export default matchRouter;
