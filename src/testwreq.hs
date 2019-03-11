{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}

{- not part of main program, just a hack to test getting
data by wreq
note postman file has useful stuff -}

import Network.Wreq
import Control.Lens
import GHC.Generics
import Data.Aeson
import Data.Aeson.Lens (_String, key)
import Data.Map
import Network.Wreq.Types

data Person = Person {
      num :: Int
    , str  :: String
    } deriving (Generic, Show)

instance ToJSON Person
instance FromJSON Person

main :: IO ()
main = do
    let opts = defaults & param "q" .~ ["tetris"] & param "language" .~ ["haskell"]
               & header "Accept" .~ ["application/json"]
    r <- getWith opts "http://httpbin.org/get"
    putStrLn $ show $ r ^. responseBody . key "url" . _String
    let p = Person { num = 4, str = "taco"}
    rr <- post "http://httpbin.org/post" (toJSON p) -- ["num" := (3 :: Int), "str" := ("wat" :: String)]
    putStrLn $ show $ rr ^? responseBody . key "json"
