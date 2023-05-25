import sequelize = require('sequelize');
import matchModel from '../models/matches.model';
import teamModel from '../models/teams.model';

const queryAway:sequelize
  .FindAttributeOptions = [
    [
      sequelize.literal('awayTeam.team_name'),
      'name',
    ],

    [
      sequelize.literal(`SUM( CASE
      WHEN away_team_goals > home_team_goals THEN 3
      WHEN away_team_goals = home_team_goals THEN 1
      WHEN away_team_goals < home_team_goals THEN 0
      END)`),
      'totalPoints',
    ],

    [
      sequelize.fn('COUNT', sequelize.col('away_team_id')),
      'totalGames',
    ],

    [
      sequelize.literal(`COUNT( IF
      (away_team_goals > home_team_goals, 1, null))`),
      'totalVictories',
    ],

    [
      sequelize.literal(`COUNT( IF
      (away_team_goals = home_team_goals, 1, null))`),
      'totalDraws',
    ],

    [
      sequelize.literal(`COUNT( IF
      (away_team_goals < home_team_goals, 1, null))`),
      'totalLosses',
    ],

    [
      sequelize.fn('SUM', sequelize.col('away_team_goals')),
      'goalsFavor',
    ],

    [
      sequelize.fn('SUM', sequelize.col('home_team_goals')),
      'goalsOwn',
    ],

    [
      sequelize.literal('SUM(home_team_goals) - SUM(away_team_goals)'),
      'goalsBalance',
    ],

    [
      sequelize.literal(`ROUND( SUM( CASE
      WHEN home_team_goals > away_team_goals THEN 3
      WHEN home_team_goals = away_team_goals THEN 1
      ELSE 0
      END) / (COUNT(home_team_id) * 3) * 100, 2)`),
      'efficiency',
    ],
  ];

const getAllTeamMatches = async () => {
  const allMatches = await matchModel.findAll({
    where: { inProgress: false },
    raw: true,
    include: [
      { model: teamModel,
        as: 'awayTeam',
        attributes: [] },
    ],
    attributes: queryAway,
    group: 'away_team_id',
    order: [
      ['totalPoints', 'DESC'],
      ['totalVictories', 'DESC'],
      ['goalsBalance', 'DESC'],
      ['goalsFavor', 'DESC'],
    ],
  });
  return allMatches;
};

const leaderService = {
  getAllTeamMatches,
};

export default leaderService;
