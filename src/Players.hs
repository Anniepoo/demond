{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE NumericUnderscores #-}
{-# LANGUAGE DeriveGeneric #-}

module Players where

import           Data.Aeson       hiding (json)
import           GHC.Generics

data EnoughPlayers = EnoughPlayers {
    enough_players :: Bool
} deriving (Generic, Show)

instance ToJSON EnoughPlayers
instance FromJSON EnoughPlayers
