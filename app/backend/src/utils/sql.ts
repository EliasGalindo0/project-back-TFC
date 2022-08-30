const query = `SELECT
team_name AS 'name',
((SUM(home_team_goals > away_team_goals) * 3) + SUM(home_team_goals = away_team_goals))
AS 'totalPoints',
COUNT(*) AS 'totalGames',
SUM(home_team_goals > away_team_goals) AS 'totalVictories',
SUM(home_team_goals = away_team_goals) AS 'totalDraws',
SUM(home_team_goals < away_team_goals) AS 'totalLosses',
SUM(home_team_goals) AS 'goalsFavor',
SUM(away_team_goals) AS 'goalsOwn',
(SUM(home_team_goals) - SUM(away_team_goals)) AS 'goalsBalance',
FORMAT(((((SUM(m.home_team_goals > m.away_team_goals) * 3)
  + SUM(m.home_team_goals = m.away_team_goals))
  / (COUNT(m.home_team) * 3))*100), 2) AS 'efficiency'
FROM TRYBE_FUTEBOL_CLUBE.matches AS m
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t
ON m.home_team = t.id
WHERE in_progress = 0
GROUP BY t.id
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

export default query;
