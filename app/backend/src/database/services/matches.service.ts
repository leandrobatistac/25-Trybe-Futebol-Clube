import matchModel from '../models/matches.model';
import teamModel from '../models/teams.model';

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
const matchService = {
  getAllMatches,
};

export default matchService;
