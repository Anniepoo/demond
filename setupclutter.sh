#!/bin/bash

/home/anniepoo/graphqurl/bin/run https://rakshasa-game.herokuapp.com/v1alpha1/graphql \
   -q "mutation addtower(\$towers: [towers_insert_input!]!) { \
  	        insert_towers(objects: \$towers) { \
                returning { \
                    id \
                } \
            } \
        }" \
    -v 'towers=[{ "col": 9.2, "row": 3.2}, { "col": 8.0, "row": -1.8}]' \
    DEBUG=*
