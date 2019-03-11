'((now() - players.lastseen) < '00:05:00'::interval)


(SELECT             id,
                    'p' as type,
                    name,
                    'player.jpg' as image,
                    xpos,
                    ypos,
                    xpos - ypos as zpos,
                    xvel,
                    yvel,
                    extract(epoch from lastseen) as reftime,
                    0.0 as progress
                    FROM players
    WHERE ((now() - players.lastseen) < '00:05:00'::interval))
UNION
(SELECT powerups.id as id,
        'u' as type,
        poweruptypes.name as name,
        poweruptypes.image as image,
        powerups.xpos as xpos,
        powerups.ypos as ypos,
        powerups.xpos - powerups.ypos as zpos,
        0::Numeric as xvel,
        0::Numeric as yvel,
        extract(epoch from now()) as reftime,
        0.0 as progress
    FROM
        powerups INNER JOIN poweruptypes
        ON powerups.type = poweruptypes.id)
UNION
(SELECT id,
        'd' as type,
        name,
        'demon.jpg' as image,
        xpos,
        ypos,
        xpos - ypos as zpos,
        xvel,
        yvel,
        extract(epoch from lastseen) as reftime,
        0.0 as progress
    FROM
        demons)
UNION
(SELECT id,
        't' as type,
        'tower' as name,
        'tower.jpg' as image,
        xpos,
        ypos,
        xpos - ypos as zpos,
        0::Numeric as xvel,
        0::Numeric as yvel,
        extract(epoch from now()) as reftime,
        progress
    FROM
        towers)
UNION
(SELECT clutter.id as id,
        'c' as type,
        poweruptypes.name as name,
        poweruptypes.image as image,
        clutter.xpos as xpos,
        clutter.ypos as ypos,
        clutter.xpos - clutter.ypos as zpos,
        0::Numeric as xvel,
        0::Numeric as yvel,
        extract(epoch from now()) as reftime,
        0.0 as progress
    FROM
        clutter INNER JOIN poweruptypes
        ON clutter.type = poweruptypes.id)
