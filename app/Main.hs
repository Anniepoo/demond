{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE NumericUnderscores #-}

module Main where

import Lib

import Web.Spock
import Web.Spock.Config

import Web.Spock.Lucid (lucid)
import Lucid

import Control.Concurrent (forkIO, threadDelay)

import System.Environment (getEnv)

-- runSpock :: Port -> IO Middleware -> IO ()

main :: IO ()
main = do
    port <- (read <$> getEnv "PORT")
    cfg <- defaultSpockCfg () PCNoDatabase ()
    forkIO  (
        do
            putStrLn "forked thread"
            threadDelay 2_000_000
            putStrLn "end thread")
    runSpock port (spock cfg app)

type Server a = SpockM () () () a

app :: Server ()
app = do get root $ lucid $ do
                            h1_ "Hello!"
                            p_ "How are you today?"
         get "foo" $ lucid $ do
                             h1_ "FOO!"

-- newtype ServerState = ServerState { notes :: IORef [Note] }



-- Control.Concurrent  Concurrent and Parallel programming in Haskell

-- https://haskell-at-work.com/episodes/2018-04-09-your-first-web-application-with-spock.html
