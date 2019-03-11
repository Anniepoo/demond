{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE NumericUnderscores #-}

module GameAction (Piece) where

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

{-
initGame :: [Piece]
initGame =
    do
        IO []
-}

-- catMaybes
-- maybeDemon
-- map maybeDemon, which returns Maybe Demon (Just Demon or Nothing)
-- then catMaybe which returns a list of demons
-- mapMaybe - map, discarding the Nothings
