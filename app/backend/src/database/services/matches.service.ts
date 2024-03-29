import { JwtPayload } from 'jsonwebtoken';
import matchModel from '../models/matches.model';
import teamModel from '../models/teams.model';
import tokens from '../utils/token';

const getAllMatches = async (inProgress: unknown) => {
  const allMatches = await matchModel.findAll({
    include: [
      { model: teamModel, as: 'homeTeam', attributes: ['teamName'] },
      { model: teamModel, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });

  if (inProgress === 'true') {
    const filteredMatches = allMatches.filter((e) => e.inProgress === true);
    return filteredMatches;
  }

  if (inProgress === 'false') {
    const filteredMatches = allMatches.filter((e) => e.inProgress === false);
    return filteredMatches;
  }

  return allMatches;
};

const finishMatch = async (id:number, token:string) => {
  tokens.validate(token) as JwtPayload;
  const matchFromId = await matchModel.findByPk(id);
  const updatedMatch = await matchFromId?.update({ inProgress: false }, { where: { id } });
  return updatedMatch;
};

const updateMatch = async (id:number, token:string, homeTeamGoals:number, awayTeamGoals:number) => {
  tokens.validate(token) as JwtPayload;
  const matchFromId = await matchModel.findByPk(id);
  const updated = await matchFromId?.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  return updated;
};

interface MatchInfo {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
}

const createMatch = async (token:string, matchsInfo:MatchInfo) => {
  tokens.validate(token) as JwtPayload;

  const {
    homeTeamId,
    homeTeamGoals,
    awayTeamId,
    awayTeamGoals,
  } = matchsInfo;

  const newMatch = await matchModel.create({
    homeTeamId,
    homeTeamGoals,
    awayTeamId,
    awayTeamGoals,
    inProgress: true,
  });

  return newMatch;
};

const matchService = {
  getAllMatches,
  finishMatch,
  updateMatch,
  createMatch,
};

export default matchService;
