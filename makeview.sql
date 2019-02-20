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
