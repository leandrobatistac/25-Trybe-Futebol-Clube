import teamModel from '../models/teams.model';

const getAllTeams = async () => {
  const allTeams = await teamModel.findAll({ attributes: ['id', 'teamName'] });
  return allTeams;
};

const teamService = {
  getAllTeams,
};

export default teamService;
