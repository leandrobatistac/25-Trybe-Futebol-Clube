import * as express from 'express';
import 'express-async-errors';

import teamsRoute from './database/routes/teams.route';
import loginRoute from './database/routes/login.route';
import matchRoute from './database/routes/match.route';
import leaderboardRoute from './database/routes/leaderboard.route';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use('/teams', teamsRoute);
    this.app.use('/login', loginRoute);
    this.app.use('/matches', matchRoute);
    this.app.use('/leaderboard', leaderboardRoute);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
