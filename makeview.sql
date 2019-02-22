CREATE VIEW enough_players AS
SELECT
  json_build_object(
    'enough_players',
    COUNT(*) >= 2
  ) AS "root"
FROM
  (
    SELECT
      1 AS "root__one"
    FROM
      (
        SELECT
          *
        FROM
          "public"."players"
        WHERE
          ('true')
      ) AS "_0_root.base"
  ) AS "_1_root"


CREATE OR REPLACE VIEW "public"."enough_players" AS 
 SELECT json_build_object('enough_players', (count(*) >= 2)) AS root
   FROM ( SELECT 1 AS root__one
           FROM ( SELECT players.id,
                    players.name,
                    players.xpos,
                    players.ypos,
                    players.xvel,
                    players.yvel,
                    players.breath,
                    players.lastseen
                   FROM players
                  WHERE true) "_0_root.base") _1_root;



SELECT * FROM players WHERE now() - lastseen < INTERVAL '36000 seconds';


(now() - players.lastseen) < '00:05:00'::interval)

CREATE OR REPLACE VIEW "public"."recentchatid" AS 
 SELECT chat.id,
    chat."time",
    chat.player,
    chat.contents
   FROM chat
  WHERE ((now() - chat."time") < '00:00:30'::interval);


CREATE OR REPLACE VIEW "public"."recentchatid" AS 




CREATE OR REPLACE VIEW "public"."recentchatid" AS 
 SELECT chat.id,
    chat."time",
    chat.player,
    chat.contents,
    players.name
   FROM (chat
     JOIN players ON ((players.id = chat.player)))
  WHERE ((now() - chat."time") < '00:00:30'::interval);



