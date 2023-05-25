// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon';
import * as chai from 'chai';

import { app } from '../app';
import { Response } from 'superagent';
import { getAllTeams, getOneTeam } from '../database/mocks/team.mock';
import { Model } from 'sequelize';

import teamModel from '../database/models/teams.model';
import teamService from '../database/services/teams.service';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testa a rota /teams', () => {
    let chaiHttpResponse: Response;

    afterEach(() => {
        Sinon.restore();
    });

  it('Verifica se retorna corretamente todos os times', async () => {
      Sinon.stub(teamModel, 'findAll').resolves(getAllTeams as unknown as Model<any, any>[]); 
      const { status, body } = await chai.request(app).get('/teams')
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(getAllTeams);
  })

  it('Verifica se retorna corretamente um time específico', async () => {
      Sinon.stub(teamModel, 'findOne').resolves(getOneTeam as unknown as Model<any, any>);
      const { status, body } = await chai.request(app).get('/teams/16')
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(getOneTeam);
  })

  it('Verifica se retorna um erro ao não encontrar um time', async () => {
      Sinon.stub(teamModel, 'findOne').resolves();
      expect(await teamService.getTeamById(1)).to.be.equal('There is no team with such id!')
  })
})
;