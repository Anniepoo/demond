{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE NumericUnderscores #-}
{-# LANGUAGE DeriveGeneric #-}

module Demons where

import           Data.Aeson       hiding (json)
import           GHC.Generics

data Demon = Demon {

} deriving (Generic, Show)

instance ToJSON Demon
instance FromJSON Demon

demonNames :: [String]
demonNames =
    [
    "Chantotkania",
    "Hidimba",
    "Hidimbi",
    "Indrajit",
    "Khara",
    "Kumbhakarna",
    "Maricha",
    "Prahasta",
    "Ravana",
    "Subahu",
    "Tataka",
    "Vibhishana",
    "Viradh",
    "Vatapi",
    "Dhoomralochana",
    "Bhandasura",
    "Durgam",
    "Daruka",
    "Mandodari",
    "Tadaka",
    "Mara"]
