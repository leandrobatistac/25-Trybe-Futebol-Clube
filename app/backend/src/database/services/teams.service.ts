import teamModel from '../models/teams.model';

const getAllTeams = async () => {
  const allTeams = await teamModel.findAll({ attributes: ['id', 'teamName'] });
  return allTeams;
};

const getTeamById = async (id:number) => teamModel.findOne({
  attributes: ['id', 'teamName'],
  where: { id },
});

const teamService = {
  getAllTeams,
  getTeamById,
};

export default teamService;
