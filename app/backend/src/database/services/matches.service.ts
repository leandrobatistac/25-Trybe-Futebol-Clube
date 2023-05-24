import matchModel from '../models/matches.model';
import teamModel from '../models/teams.model';

const getAllMatches = async () => {
  const allMatches = await matchModel.findAll({
    include: [
      { model: teamModel, as: 'homeTeam', attributes: ['teamName'] },
      { model: teamModel, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });
  return allMatches;
};
const matchService = {
  getAllMatches,
};

export default matchService;
