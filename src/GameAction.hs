{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE NumericUnderscores #-}

module GameAction (initGame, Piece) where

import RakshasaClient (truncateServer)
data Piece = Piece {
        id :: Int,
        pieceType :: String,
        name :: String,
        xpos :: Float,
        ypos :: Float,
        zpos :: Float,
        xvel :: Float,
        yvel :: Float,
        reftime :: Float,
        progress :: Float
    }

initGame :: IO [Piece]
initGame = do
    truncateServer
    return initVals

initVals :: [Piece]
initVals = []

-- catMaybes
-- maybeDemon
-- map maybeDemon, which returns Maybe Demon (Just Demon or Nothing)
-- then catMaybe which returns a list of demons
-- mapMaybe - map, discarding the Nothings
