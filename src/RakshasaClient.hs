{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}

{- not part of main program, just a hack to test getting
data by wreq
note postman file has useful stuff -}

module RakshasaClient where

import Network.Wreq
import Control.Lens
import GHC.Generics
import Data.Aeson
import Data.Aeson.Types
import Data.Aeson.Lens (_String, key)
import Data.Map
import Network.Wreq.Types


data GQL = GQL {
    query :: String,
    variables :: Value
    } deriving (Generic, Show)

instance ToJSON GQL
instance FromJSON GQL

data MinTower = MinTower {

}

truncateServer :: IO ()
truncateServer = do
    let gql = GQL {
        query = "query some_towers($n: Int!){towers(limit: $n){xpos ypos progress}}",
        variables = toJSON ("{\"n\": 1}"::String)
    }
    putStrLn $ show "in truncateServer"
    rr <- post "https://rakshasa-game.herokuapp.com/v1alpha1/graphql" (toJSON gql)
    putStrLn $ show $ rr ^? responseBody . key "json"
{-
    putStrLn $ show $ rr ^? responseBody
    let maybejson = rr ^? responseBody . key "json"
    case maybejson of
        Nothing -> putStrLn "invalid json"
        Just json -> do
            let towers = json ^. (key "data") . (key "towers")
            putStrLn $ show towers
-}
-- alternative - use responseBody and ^. and use decode
--       decode body :: Maybe Person
